export type Bilingual = { en: string; kn: string };

export interface QuizQuestion {
  question: Bilingual;
  options: Bilingual[];
  answerIndex: number;
}

export interface StoryPage {
  text: Bilingual;
  emoji: string; // simple illustration placeholder
  bg: string; // tailwind gradient class
}

export interface Hero {
  id: string;
  name: Bilingual;
  title: Bilingual;
  era: string;
  emoji: string;
  pages: StoryPage[];
  quiz: QuizQuestion[];
  memorial: {
    name: Bilingual;
    place: Bilingual;
    description: Bilingual;
    mapsQuery: string;
  };
}

export interface District {
  id: string;
  name: Bilingual;
  emoji: string;
  heroes: Hero[];
}

// Helper to keep the long district list compact. Cycles page backgrounds.
const PAGE_BGS = ["bg-gradient-warm", "bg-gradient-sunset"];
type MkHeroInput = {
  id: string;
  emoji: string;
  name: [string, string];
  title: [string, string];
  era: string;
  pages: Array<[string, string, string]>; // [en, kn, emoji]
  quiz: Array<[string, string, [string, string, string], [string, string, string], number]>; // [qEn,qKn,enOpts,knOpts,answerIdx]
  memorial: [string, string, string, string, string, string, string]; // nameEn,nameKn,placeEn,placeKn,descEn,descKn,mapsQuery
};
function mkHero(h: MkHeroInput): Hero {
  return {
    id: h.id,
    emoji: h.emoji,
    name: { en: h.name[0], kn: h.name[1] },
    title: { en: h.title[0], kn: h.title[1] },
    era: h.era,
    pages: h.pages.map(([en, kn, emoji], i) => ({
      text: { en, kn },
      emoji,
      bg: PAGE_BGS[i % PAGE_BGS.length],
    })),
    quiz: h.quiz.map(([qEn, qKn, enOpts, knOpts, answerIndex]) => ({
      question: { en: qEn, kn: qKn },
      options: enOpts.map((en, i) => ({ en, kn: knOpts[i] })),
      answerIndex,
    })),
    memorial: {
      name: { en: h.memorial[0], kn: h.memorial[1] },
      place: { en: h.memorial[2], kn: h.memorial[3] },
      description: { en: h.memorial[4], kn: h.memorial[5] },
      mapsQuery: h.memorial[6],
    },
  };
}

export const DISTRICTS: District[] = [
  {
    id: "belagavi",
    name: { en: "Belagavi", kn: "ಬೆಳಗಾವಿ" },
    emoji: "🏰",
    heroes: [
      {
        id: "kittur-chennamma",
        name: { en: "Kittur Rani Chennamma", kn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ" },
        title: { en: "The Warrior Queen of Kittur", kn: "ಕಿತ್ತೂರಿನ ವೀರ ರಾಣಿ" },
        era: "1778 – 1829",
        emoji: "👸",
        pages: [
          {
            emoji: "🏰",
            bg: "bg-gradient-warm",
            text: {
              en: "Long ago in Kittur, a brave little girl named Chennamma loved horse riding, sword fighting and archery.",
              kn: "ಬಹಳ ಹಿಂದೆ ಕಿತ್ತೂರಿನಲ್ಲಿ ಚೆನ್ನಮ್ಮ ಎಂಬ ಧೈರ್ಯಶಾಲಿ ಹುಡುಗಿ ಕುದುರೆ ಸವಾರಿ, ಕತ್ತಿವರಸೆ ಮತ್ತು ಬಿಲ್ಲುಗಾರಿಕೆಯನ್ನು ಪ್ರೀತಿಸುತ್ತಿದ್ದಳು.",
            },
          },
          {
            emoji: "👑",
            bg: "bg-gradient-sunset",
            text: {
              en: "She grew up to become the queen of Kittur and ruled her people with love and courage.",
              kn: "ಅವಳು ಬೆಳೆದು ಕಿತ್ತೂರಿನ ರಾಣಿಯಾದಳು ಮತ್ತು ಪ್ರೀತಿ ಹಾಗೂ ಧೈರ್ಯದಿಂದ ಜನರನ್ನು ಆಳಿದಳು.",
            },
          },
          {
            emoji: "⚔️",
            bg: "bg-gradient-warm",
            text: {
              en: "When the British tried to take her kingdom in 1824, Chennamma said, 'No! This land belongs to my people!'",
              kn: "1824ರಲ್ಲಿ ಬ್ರಿಟಿಷರು ಅವಳ ರಾಜ್ಯವನ್ನು ಕಸಿದುಕೊಳ್ಳಲು ಬಂದಾಗ, ಚೆನ್ನಮ್ಮ ಹೇಳಿದಳು: 'ಇಲ್ಲ! ಈ ನಾಡು ನನ್ನ ಜನರದು!'",
            },
          },
          {
            emoji: "🏹",
            bg: "bg-gradient-sunset",
            text: {
              en: "She led her army into battle and defeated the British. She became one of the first queens to fight for India's freedom.",
              kn: "ಅವಳು ತನ್ನ ಸೈನ್ಯವನ್ನು ಯುದ್ಧಕ್ಕೆ ಕರೆದೊಯ್ದು ಬ್ರಿಟಿಷರನ್ನು ಸೋಲಿಸಿದಳು. ಭಾರತದ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕಾಗಿ ಹೋರಾಡಿದ ಮೊದಲ ರಾಣಿಯರಲ್ಲಿ ಅವಳು ಒಬ್ಬಳು.",
            },
          },
          {
            emoji: "🌟",
            bg: "bg-gradient-warm",
            text: {
              en: "Today, Kittur Chennamma is remembered as a symbol of bravery. Her courage still inspires us all!",
              kn: "ಇಂದಿಗೂ ಕಿತ್ತೂರು ಚೆನ್ನಮ್ಮ ಧೈರ್ಯದ ಸಂಕೇತವಾಗಿ ನೆನಪಿಸಿಕೊಳ್ಳಲ್ಪಡುತ್ತಾಳೆ. ಅವಳ ಧೈರ್ಯ ಇಂದಿಗೂ ನಮಗೆಲ್ಲ ಸ್ಫೂರ್ತಿ!",
            },
          },
        ],
        quiz: [
          {
            question: { en: "Which kingdom did Chennamma rule?", kn: "ಚೆನ್ನಮ್ಮ ಯಾವ ರಾಜ್ಯವನ್ನು ಆಳಿದಳು?" },
            options: [
              { en: "Mysuru", kn: "ಮೈಸೂರು" },
              { en: "Kittur", kn: "ಕಿತ್ತೂರು" },
              { en: "Hampi", kn: "ಹಂಪಿ" },
            ],
            answerIndex: 1,
          },
          {
            question: { en: "Whom did she fight against?", kn: "ಅವಳು ಯಾರ ವಿರುದ್ಧ ಹೋರಾಡಿದಳು?" },
            options: [
              { en: "The British", kn: "ಬ್ರಿಟಿಷರು" },
              { en: "The Mughals", kn: "ಮೊಘಲರು" },
              { en: "The Marathas", kn: "ಮರಾಠರು" },
            ],
            answerIndex: 0,
          },
          {
            question: { en: "What did she love as a child?", kn: "ಬಾಲ್ಯದಲ್ಲಿ ಅವಳಿಗೆ ಏನು ಪ್ರಿಯವಾಗಿತ್ತು?" },
            options: [
              { en: "Painting", kn: "ಚಿತ್ರಕಲೆ" },
              { en: "Singing", kn: "ಹಾಡುಗಾರಿಕೆ" },
              { en: "Sword fighting & riding", kn: "ಕತ್ತಿವರಸೆ ಮತ್ತು ಸವಾರಿ" },
            ],
            answerIndex: 2,
          },
        ],
        memorial: {
          name: { en: "Kittur Fort & Chennamma Statue", kn: "ಕಿತ್ತೂರು ಕೋಟೆ ಮತ್ತು ಚೆನ್ನಮ್ಮ ಪ್ರತಿಮೆ" },
          place: { en: "Kittur, Belagavi District", kn: "ಕಿತ್ತೂರು, ಬೆಳಗಾವಿ ಜಿಲ್ಲೆ" },
          description: {
            en: "The historic Kittur Fort and museum preserves Rani Chennamma's legacy. A grand statue stands at the entrance.",
            kn: "ಐತಿಹಾಸಿಕ ಕಿತ್ತೂರು ಕೋಟೆ ಮತ್ತು ವಸ್ತುಸಂಗ್ರಹಾಲಯವು ರಾಣಿ ಚೆನ್ನಮ್ಮನ ಪರಂಪರೆಯನ್ನು ಕಾಪಾಡಿಕೊಂಡಿದೆ.",
          },
          mapsQuery: "Kittur Fort Belagavi Karnataka",
        },
      },
    ],
  },
  {
    id: "shivamogga",
    name: { en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ" },
    emoji: "🌳",
    heroes: [
      {
        id: "kuvempu",
        name: { en: "Kuvempu", kn: "ಕುವೆಂಪು" },
        title: { en: "The Poet of Karnataka", kn: "ಕರ್ನಾಟಕದ ಕವಿ" },
        era: "1904 – 1994",
        emoji: "📜",
        pages: [
          {
            emoji: "🌲",
            bg: "bg-gradient-warm",
            text: {
              en: "In the green hills of Kuppalli, a boy named Puttappa grew up surrounded by forests, rivers and birdsong.",
              kn: "ಕುಪ್ಪಳಿಯ ಹಸಿರು ಬೆಟ್ಟಗಳಲ್ಲಿ ಪುಟ್ಟಪ್ಪ ಎಂಬ ಹುಡುಗ ಕಾಡು, ನದಿ ಮತ್ತು ಪಕ್ಷಿಗಳ ನಡುವೆ ಬೆಳೆದನು.",
            },
          },
          {
            emoji: "📖",
            bg: "bg-gradient-sunset",
            text: {
              en: "He loved books and began to write beautiful poems in Kannada. The world came to know him as 'Kuvempu'.",
              kn: "ಅವನು ಪುಸ್ತಕಗಳನ್ನು ಪ್ರೀತಿಸಿದನು ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಸುಂದರ ಕವನಗಳನ್ನು ಬರೆಯಲು ಆರಂಭಿಸಿದನು. ಜಗತ್ತು ಅವನನ್ನು 'ಕುವೆಂಪು' ಎಂದು ತಿಳಿಯಿತು.",
            },
          },
          {
            emoji: "🏆",
            bg: "bg-gradient-warm",
            text: {
              en: "Kuvempu wrote 'Sri Ramayana Darshanam' and won the Jnanpith — the highest honour for an Indian writer.",
              kn: "ಕುವೆಂಪು 'ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ' ಬರೆದು ಭಾರತದ ಅತ್ಯುನ್ನತ ಗೌರವವಾದ ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಯನ್ನು ಗೆದ್ದರು.",
            },
          },
          {
            emoji: "🎶",
            bg: "bg-gradient-sunset",
            text: {
              en: "He gave Karnataka its state anthem — 'Jaya Bharata Jananiya Tanujate' — that we sing with pride.",
              kn: "ಅವರು ಕರ್ನಾಟಕಕ್ಕೆ 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ' ಎಂಬ ನಾಡಗೀತೆಯನ್ನು ನೀಡಿದರು — ನಾವು ಹೆಮ್ಮೆಯಿಂದ ಹಾಡುವ ಗೀತೆ.",
            },
          },
          {
            emoji: "🌟",
            bg: "bg-gradient-warm",
            text: {
              en: "Kuvempu taught us to love nature, learning and our mother tongue. His words still light up Karnataka.",
              kn: "ಕುವೆಂಪು ನಮಗೆ ಪ್ರಕೃತಿ, ಜ್ಞಾನ ಮತ್ತು ಮಾತೃಭಾಷೆಯನ್ನು ಪ್ರೀತಿಸಲು ಕಲಿಸಿದರು.",
            },
          },
        ],
        quiz: [
          {
            question: { en: "What is Kuvempu's real name?", kn: "ಕುವೆಂಪು ಅವರ ನಿಜವಾದ ಹೆಸರು ಏನು?" },
            options: [
              { en: "Puttappa", kn: "ಪುಟ್ಟಪ್ಪ" },
              { en: "Basavappa", kn: "ಬಸವಪ್ಪ" },
              { en: "Shivappa", kn: "ಶಿವಪ್ಪ" },
            ],
            answerIndex: 0,
          },
          {
            question: { en: "Which great award did he win?", kn: "ಅವರು ಯಾವ ಮಹಾನ್ ಪ್ರಶಸ್ತಿಯನ್ನು ಗೆದ್ದರು?" },
            options: [
              { en: "Oscar", kn: "ಆಸ್ಕರ್" },
              { en: "Jnanpith", kn: "ಜ್ಞಾನಪೀಠ" },
              { en: "Nobel", kn: "ನೊಬೆಲ್" },
            ],
            answerIndex: 1,
          },
          {
            question: { en: "He wrote Karnataka's…", kn: "ಅವರು ಕರ್ನಾಟಕದ ... ಬರೆದರು" },
            options: [
              { en: "Map", kn: "ನಕ್ಷೆ" },
              { en: "State anthem", kn: "ನಾಡಗೀತೆ" },
              { en: "Constitution", kn: "ಸಂವಿಧಾನ" },
            ],
            answerIndex: 1,
          },
        ],
        memorial: {
          name: { en: "Kavishaila & Kuppalli Memorial", kn: "ಕವಿಶೈಲ ಮತ್ತು ಕುಪ್ಪಳಿ ಸ್ಮಾರಕ" },
          place: { en: "Kuppalli, Shivamogga District", kn: "ಕುಪ್ಪಳಿ, ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ" },
          description: {
            en: "Kuvempu's birthplace turned museum, with the famous Kavishaila rock memorial set in the Western Ghats.",
            kn: "ಕುವೆಂಪು ಅವರ ಜನ್ಮಸ್ಥಳ ಇಂದು ವಸ್ತುಸಂಗ್ರಹಾಲಯವಾಗಿದೆ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಪ್ರಸಿದ್ಧ ಕವಿಶೈಲ ಸ್ಮಾರಕ ಇದೆ.",
          },
          mapsQuery: "Kavishaila Kuppalli Shivamogga",
        },
      },
    ],
  },
  {
    id: "bagalkot",
    name: { en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ" },
    emoji: "🪔",
    heroes: [
      {
        id: "basavanna",
        name: { en: "Basavanna", kn: "ಬಸವಣ್ಣ" },
        title: { en: "The Social Reformer & Vachana Poet", kn: "ಸಮಾಜ ಸುಧಾರಕ ಮತ್ತು ವಚನಕಾರ" },
        era: "12th Century",
        emoji: "🪔",
        pages: [
          {
            emoji: "👦",
            bg: "bg-gradient-warm",
            text: {
              en: "In Basavana Bagewadi, a thoughtful boy named Basava asked, 'Why are some people treated less than others?'",
              kn: "ಬಸವನ ಬಾಗೇವಾಡಿಯಲ್ಲಿ ಬಸವ ಎಂಬ ಚಿಂತನಶೀಲ ಹುಡುಗ ಕೇಳಿದನು: 'ಕೆಲವರನ್ನು ಯಾಕೆ ಕೀಳಾಗಿ ನೋಡುತ್ತಾರೆ?'",
            },
          },
          {
            emoji: "🪔",
            bg: "bg-gradient-sunset",
            text: {
              en: "He grew up to teach that all people — rich or poor — are equal in the eyes of God.",
              kn: "ಬಡವ-ಶ್ರೀಮಂತರೆನ್ನದೆ ಎಲ್ಲರೂ ದೇವರ ಮುಂದೆ ಸಮಾನರೆಂದು ಬೋಧಿಸಿದರು.",
            },
          },
          {
            emoji: "📜",
            bg: "bg-gradient-warm",
            text: {
              en: "Basavanna wrote short poems called 'Vachanas' in simple Kannada so everyone could understand.",
              kn: "ಬಸವಣ್ಣ ಎಲ್ಲರೂ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲೆಂದು ಸರಳ ಕನ್ನಡದಲ್ಲಿ 'ವಚನ'ಗಳನ್ನು ರಚಿಸಿದರು.",
            },
          },
          {
            emoji: "🏛️",
            bg: "bg-gradient-sunset",
            text: {
              en: "He started 'Anubhava Mantapa' — a meeting hall where people of every caste and gender shared ideas freely.",
              kn: "ಎಲ್ಲ ಜಾತಿ-ಲಿಂಗದವರು ಮುಕ್ತವಾಗಿ ಚರ್ಚಿಸುವ 'ಅನುಭವ ಮಂಟಪ'ವನ್ನು ಸ್ಥಾಪಿಸಿದರು.",
            },
          },
          {
            emoji: "🌟",
            bg: "bg-gradient-warm",
            text: {
              en: "His message of equality, kindness and honest work guides Karnataka even today. Kayakave Kailasa!",
              kn: "ಸಮಾನತೆ, ಕರುಣೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ಕಾಯಕದ ಸಂದೇಶ ಇಂದಿಗೂ ನಮಗೆ ಮಾರ್ಗದರ್ಶನ. ಕಾಯಕವೇ ಕೈಲಾಸ!",
            },
          },
        ],
        quiz: [
          {
            question: { en: "What did Basavanna call his poems?", kn: "ಬಸವಣ್ಣ ತಮ್ಮ ಕವಿತೆಗಳನ್ನು ಏನು ಕರೆದರು?" },
            options: [
              { en: "Vachanas", kn: "ವಚನಗಳು" },
              { en: "Shlokas", kn: "ಶ್ಲೋಕಗಳು" },
              { en: "Ragas", kn: "ರಾಗಗಳು" },
            ],
            answerIndex: 0,
          },
          {
            question: { en: "What hall did he start?", kn: "ಅವರು ಯಾವ ಮಂಟಪವನ್ನು ಸ್ಥಾಪಿಸಿದರು?" },
            options: [
              { en: "Anubhava Mantapa", kn: "ಅನುಭವ ಮಂಟಪ" },
              { en: "Vidhana Soudha", kn: "ವಿಧಾನ ಸೌಧ" },
              { en: "Raja Sabha", kn: "ರಾಜ ಸಭೆ" },
            ],
            answerIndex: 0,
          },
          {
            question: { en: "His main message was…", kn: "ಅವರ ಮುಖ್ಯ ಸಂದೇಶ..." },
            options: [
              { en: "War", kn: "ಯುದ್ಧ" },
              { en: "Equality", kn: "ಸಮಾನತೆ" },
              { en: "Wealth", kn: "ಸಂಪತ್ತು" },
            ],
            answerIndex: 1,
          },
        ],
        memorial: {
          name: { en: "Basavanna Birthplace Temple", kn: "ಬಸವಣ್ಣ ಜನ್ಮಸ್ಥಳ ದೇವಾಲಯ" },
          place: { en: "Basavana Bagewadi, Bagalkot", kn: "ಬಸವನ ಬಾಗೇವಾಡಿ, ಬಾಗಲಕೋಟೆ" },
          description: {
            en: "The temple and museum at Basavanna's birthplace honour his life and teachings.",
            kn: "ಬಸವಣ್ಣ ಅವರ ಜನ್ಮಸ್ಥಳದಲ್ಲಿರುವ ದೇವಾಲಯ ಮತ್ತು ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಅವರ ಜೀವನವನ್ನು ಗೌರವಿಸುತ್ತದೆ.",
          },
          mapsQuery: "Basavana Bagewadi Bagalkot Karnataka",
        },
      },
    ],
  },
  {
    id: "mysuru",
    name: { en: "Mysuru", kn: "ಮೈಸೂರು" },
    emoji: "🐯",
    heroes: [
      {
        id: "tipu-sultan",
        name: { en: "Tipu Sultan", kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನ್" },
        title: { en: "The Tiger of Mysuru", kn: "ಮೈಸೂರಿನ ಹುಲಿ" },
        era: "1750 – 1799",
        emoji: "🐯",
        pages: [
          {
            emoji: "🐯",
            bg: "bg-gradient-warm",
            text: {
              en: "In Mysuru, a clever prince named Tipu loved books, languages and brave tigers in the forest.",
              kn: "ಮೈಸೂರಿನಲ್ಲಿ ಟಿಪ್ಪು ಎಂಬ ಜಾಣ ರಾಜಕುಮಾರ ಪುಸ್ತಕ, ಭಾಷೆಗಳು ಮತ್ತು ಕಾಡಿನ ಧೈರ್ಯಶಾಲಿ ಹುಲಿಗಳನ್ನು ಪ್ರೀತಿಸಿದನು.",
            },
          },
          {
            emoji: "👑",
            bg: "bg-gradient-sunset",
            text: {
              en: "He became the Sultan of Mysuru and built strong forts, gardens and a fair kingdom for his people.",
              kn: "ಅವನು ಮೈಸೂರಿನ ಸುಲ್ತಾನನಾದನು ಮತ್ತು ತನ್ನ ಜನರಿಗಾಗಿ ಬಲಿಷ್ಠ ಕೋಟೆಗಳು, ಉದ್ಯಾನಗಳು ಮತ್ತು ನ್ಯಾಯಯುತ ರಾಜ್ಯವನ್ನು ಕಟ್ಟಿದನು.",
            },
          },
          {
            emoji: "🚀",
            bg: "bg-gradient-warm",
            text: {
              en: "Tipu invented the world's first iron-cased war rockets, called 'Mysorean rockets'!",
              kn: "ಟಿಪ್ಪು ಜಗತ್ತಿನ ಮೊದಲ ಕಬ್ಬಿಣದ ಯುದ್ಧ ರಾಕೆಟ್‌ಗಳನ್ನು ಕಂಡುಹಿಡಿದನು — 'ಮೈಸೂರು ರಾಕೆಟ್‌ಗಳು'!",
            },
          },
          {
            emoji: "⚔️",
            bg: "bg-gradient-sunset",
            text: {
              en: "He fought the British bravely and refused to bow down. He said, 'A day as a tiger is better than a hundred as a sheep.'",
              kn: "ಅವನು ಬ್ರಿಟಿಷರೊಂದಿಗೆ ಧೈರ್ಯದಿಂದ ಹೋರಾಡಿದನು. 'ಕುರಿಯಾಗಿ ನೂರು ದಿನ ಬದುಕುವುದಕ್ಕಿಂತ ಹುಲಿಯಾಗಿ ಒಂದು ದಿನ ಉತ್ತಮ' ಎಂದನು.",
            },
          },
          {
            emoji: "🌟",
            bg: "bg-gradient-warm",
            text: {
              en: "Tipu Sultan is remembered as a fearless ruler, an inventor and a champion of his land.",
              kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ನಿರ್ಭೀತ ಆಡಳಿತಗಾರ, ಸಂಶೋಧಕ ಮತ್ತು ತನ್ನ ನಾಡಿನ ಚಾಂಪಿಯನ್ ಎಂದು ನೆನಪಿನಲ್ಲಿ ಉಳಿದಿದ್ದಾನೆ.",
            },
          },
        ],
        quiz: [
          {
            question: { en: "What is Tipu Sultan's nickname?", kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನನ ಅಡ್ಡಹೆಸರು ಏನು?" },
            options: [
              { en: "Lion of Mysuru", kn: "ಮೈಸೂರಿನ ಸಿಂಹ" },
              { en: "Tiger of Mysuru", kn: "ಮೈಸೂರಿನ ಹುಲಿ" },
              { en: "Eagle of Mysuru", kn: "ಮೈಸೂರಿನ ಗರುಡ" },
            ],
            answerIndex: 1,
          },
          {
            question: { en: "What did he invent?", kn: "ಅವನು ಏನನ್ನು ಕಂಡುಹಿಡಿದನು?" },
            options: [
              { en: "War rockets", kn: "ಯುದ್ಧ ರಾಕೆಟ್‌ಗಳು" },
              { en: "Telephone", kn: "ದೂರವಾಣಿ" },
              { en: "Bicycle", kn: "ಸೈಕಲ್" },
            ],
            answerIndex: 0,
          },
          {
            question: { en: "Which city did he rule?", kn: "ಅವನು ಯಾವ ನಗರವನ್ನು ಆಳಿದನು?" },
            options: [
              { en: "Mysuru", kn: "ಮೈಸೂರು" },
              { en: "Mangaluru", kn: "ಮಂಗಳೂರು" },
              { en: "Hubballi", kn: "ಹುಬ್ಬಳ್ಳಿ" },
            ],
            answerIndex: 0,
          },
        ],
        memorial: {
          name: { en: "Srirangapatna Fort & Gumbaz", kn: "ಶ್ರೀರಂಗಪಟ್ಟಣ ಕೋಟೆ ಮತ್ತು ಗುಂಬಜ್" },
          place: { en: "Srirangapatna, Mandya / Mysuru", kn: "ಶ್ರೀರಂಗಪಟ್ಟಣ" },
          description: {
            en: "Tipu Sultan's summer palace, fort and the Gumbaz mausoleum tell the story of his reign.",
            kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನನ ಬೇಸಿಗೆ ಅರಮನೆ, ಕೋಟೆ ಮತ್ತು ಗುಂಬಜ್ ಸಮಾಧಿ ಅವನ ಆಡಳಿತದ ಕಥೆಯನ್ನು ಹೇಳುತ್ತವೆ.",
          },
          mapsQuery: "Srirangapatna Tipu Sultan Gumbaz",
        },
      },
    ],
  },
  // Remaining Karnataka districts (heroes coming soon)
  { id: "ballari", name: { en: "Ballari", kn: "ಬಳ್ಳಾರಿ" }, emoji: "⛏️", heroes: [] },
  { id: "bengaluru-rural", name: { en: "Bengaluru Rural", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ" }, emoji: "🌾", heroes: [] },
  { id: "bengaluru-urban", name: { en: "Bengaluru Urban", kn: "ಬೆಂಗಳೂರು ನಗರ" }, emoji: "🏙️", heroes: [] },
  { id: "bidar", name: { en: "Bidar", kn: "ಬೀದರ್" }, emoji: "🕌", heroes: [] },
  { id: "chamarajanagar", name: { en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ" }, emoji: "🐘", heroes: [] },
  { id: "chikkaballapur", name: { en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ" }, emoji: "⛰️", heroes: [] },
  { id: "chikkamagaluru", name: { en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು" }, emoji: "☕", heroes: [] },
  { id: "chitradurga", name: { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ" }, emoji: "🏯", heroes: [] },
  { id: "dakshina-kannada", name: { en: "Dakshina Kannada", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ" }, emoji: "🌊", heroes: [] },
  { id: "davanagere", name: { en: "Davanagere", kn: "ದಾವಣಗೆರೆ" }, emoji: "🥞", heroes: [] },
  { id: "dharwad", name: { en: "Dharwad", kn: "ಧಾರವಾಡ" }, emoji: "🎶", heroes: [] },
  { id: "gadag", name: { en: "Gadag", kn: "ಗದಗ" }, emoji: "📜", heroes: [] },
  { id: "hassan", name: { en: "Hassan", kn: "ಹಾಸನ" }, emoji: "🛕", heroes: [] },
  { id: "haveri", name: { en: "Haveri", kn: "ಹಾವೇರಿ" }, emoji: "🌻", heroes: [] },
  { id: "kalaburagi", name: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ" }, emoji: "🕌", heroes: [] },
  { id: "kodagu", name: { en: "Kodagu", kn: "ಕೊಡಗು" }, emoji: "🌧️", heroes: [] },
  { id: "kolar", name: { en: "Kolar", kn: "ಕೋಲಾರ" }, emoji: "🪙", heroes: [] },
  { id: "koppal", name: { en: "Koppal", kn: "ಕೊಪ್ಪಳ" }, emoji: "🗿", heroes: [] },
  { id: "mandya", name: { en: "Mandya", kn: "ಮಂಡ್ಯ" }, emoji: "🌾", heroes: [] },
  { id: "raichur", name: { en: "Raichur", kn: "ರಾಯಚೂರು" }, emoji: "🏜️", heroes: [] },
  { id: "ramanagara", name: { en: "Ramanagara", kn: "ರಾಮನಗರ" }, emoji: "🪨", heroes: [] },
  { id: "tumakuru", name: { en: "Tumakuru", kn: "ತುಮಕೂರು" }, emoji: "🥥", heroes: [] },
  { id: "udupi", name: { en: "Udupi", kn: "ಉಡುಪಿ" }, emoji: "🍛", heroes: [] },
  { id: "uttara-kannada", name: { en: "Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡ" }, emoji: "🌴", heroes: [] },
  { id: "vijayanagara", name: { en: "Vijayanagara", kn: "ವಿಜಯನಗರ" }, emoji: "🛕", heroes: [] },
  { id: "vijayapura", name: { en: "Vijayapura", kn: "ವಿಜಯಪುರ" }, emoji: "🕌", heroes: [] },
  { id: "yadgir", name: { en: "Yadgir", kn: "ಯಾದಗಿರಿ" }, emoji: "🏞️", heroes: [] },
];

export const ALL_HEROES: Hero[] = DISTRICTS.flatMap((d) => d.heroes);

export function findHero(id: string): { hero: Hero; district: District } | null {
  for (const d of DISTRICTS) {
    const h = d.heroes.find((x) => x.id === id);
    if (h) return { hero: h, district: d };
  }
  return null;
}
