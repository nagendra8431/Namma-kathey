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
  const nameEn = h.name[0];
  const nameKn = h.name[1];
  const titleEn = h.title[0].toLowerCase();
  // Auto-pad story to a minimum of 5 pages with personalised closing pages.
  const paddedPages: Array<[string, string, string]> = [...h.pages];
  const fillers: Array<[string, string, string]> = [
    [
      `${nameEn} faced many challenges with courage, wisdom and a kind heart.`,
      `${nameKn} ಅವರು ಎಲ್ಲ ಸವಾಲುಗಳನ್ನು ಧೈರ್ಯ, ಜಾಣ್ಮೆ ಮತ್ತು ಕರುಣೆಯಿಂದ ಎದುರಿಸಿದರು.`,
      "💪",
    ],
    [
      `Children, families and elders loved ${nameEn} for being a true ${titleEn}.`,
      `ಮಕ್ಕಳು, ಕುಟುಂಬಗಳು, ಹಿರಿಯರು — ಎಲ್ಲರೂ ${nameKn} ಅವರನ್ನು ಪ್ರೀತಿಸಿದರು.`,
      "💖",
    ],
    [
      `Today, ${nameEn} inspires every child of Karnataka to dream big and do good.`,
      `ಇಂದು ${nameKn} ಕರ್ನಾಟಕದ ಪ್ರತಿ ಮಗುವಿಗೆ ದೊಡ್ಡ ಕನಸು ಕಾಣಲು ಸ್ಫೂರ್ತಿ.`,
      "🌟",
    ],
  ];
  let fi = 0;
  while (paddedPages.length < 5 && fi < fillers.length) {
    paddedPages.push(fillers[fi++]);
  }
  return {
    id: h.id,
    emoji: h.emoji,
    name: { en: nameEn, kn: nameKn },
    title: { en: h.title[0], kn: h.title[1] },
    era: h.era,
    pages: paddedPages.map(([en, kn, emoji], i) => ({
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
  {
    id: "ballari", name: { en: "Ballari", kn: "ಬಳ್ಳಾರಿ" }, emoji: "⛏️",
    heroes: [mkHero({
      id: "krishnadevaraya", emoji: "👑",
      name: ["Krishnadevaraya", "ಕೃಷ್ಣದೇವರಾಯ"],
      title: ["Emperor of Vijayanagara", "ವಿಜಯನಗರದ ಚಕ್ರವರ್ತಿ"],
      era: "1471 – 1529",
      pages: [
        ["A wise prince named Krishnadevaraya grew up loving books, music and elephants.", "ಕೃಷ್ಣದೇವರಾಯ ಎಂಬ ಜಾಣ ರಾಜಕುಮಾರ ಪುಸ್ತಕ, ಸಂಗೀತ ಮತ್ತು ಆನೆಗಳನ್ನು ಪ್ರೀತಿಸುತ್ತಾ ಬೆಳೆದನು.", "📚"],
        ["He became emperor of mighty Vijayanagara and made Hampi a city of gold.", "ಮಹಾನ್ ವಿಜಯನಗರದ ಚಕ್ರವರ್ತಿಯಾಗಿ ಹಂಪಿಯನ್ನು ಸ್ವರ್ಣ ನಗರಿಯಾಗಿಸಿದನು.", "🏛️"],
        ["He honoured poets and artists. Karnataka still glows with his glory.", "ಕವಿಗಳು-ಕಲಾವಿದರನ್ನು ಗೌರವಿಸಿದನು. ಅವನ ಕೀರ್ತಿ ಇಂದಿಗೂ ಬೆಳಗುತ್ತದೆ.", "🌟"],
      ],
      quiz: [
        ["Which empire did he rule?", "ಯಾವ ಸಾಮ್ರಾಜ್ಯ?", ["Vijayanagara", "Mauryan", "Chola"], ["ವಿಜಯನಗರ", "ಮೌರ್ಯ", "ಚೋಳ"], 0],
        ["His capital city was…", "ಅವನ ರಾಜಧಾನಿ...", ["Hampi", "Delhi", "Hubballi"], ["ಹಂಪಿ", "ದೆಹಲಿ", "ಹುಬ್ಬಳ್ಳಿ"], 0],
      ],
      memorial: ["Hampi Ruins (UNESCO)", "ಹಂಪಿ ಅವಶೇಷಗಳು", "Hampi, near Ballari", "ಹಂಪಿ, ಬಳ್ಳಾರಿ ಬಳಿ", "The grand ruins of Vijayanagara stand at Hampi.", "ವಿಜಯನಗರದ ಭವ್ಯ ಅವಶೇಷಗಳು ಹಂಪಿಯಲ್ಲಿವೆ.", "Hampi Karnataka"],
    })],
  },
  {
    id: "bengaluru-rural", name: { en: "Bengaluru Rural", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ" }, emoji: "🌾",
    heroes: [mkHero({
      id: "h-d-deve-gowda", emoji: "👨‍🌾",
      name: ["H. D. Deve Gowda", "ಎಚ್. ಡಿ. ದೇವೇಗೌಡ"],
      title: ["Farmer who became Prime Minister", "ಪ್ರಧಾನಿಯಾದ ರೈತ"],
      era: "1933 – present",
      pages: [
        ["In Haradanahalli a farmer's son named Deve Gowda worked in the fields each morning.", "ಹರದನಹಳ್ಳಿಯ ರೈತನ ಮಗ ದೇವೇಗೌಡ ಬೆಳಗ್ಗೆ ಹೊಲದಲ್ಲಿ ದುಡಿಯುತ್ತಿದ್ದನು.", "🌾"],
        ["He studied hard, became an engineer and entered politics to help farmers.", "ಶ್ರಮವಹಿಸಿ ಎಂಜಿನಿಯರ್ ಆಗಿ ರೈತರಿಗಾಗಿ ರಾಜಕಾರಣಕ್ಕೆ ಬಂದರು.", "📐"],
        ["In 1996 he became the Prime Minister of India — a proud moment for Karnataka.", "1996ರಲ್ಲಿ ಭಾರತದ ಪ್ರಧಾನಿಯಾದರು — ಕರ್ನಾಟಕಕ್ಕೆ ಹೆಮ್ಮೆ.", "🇮🇳"],
      ],
      quiz: [
        ["What job did he hold in 1996?", "1996ರಲ್ಲಿ ಹುದ್ದೆ?", ["Prime Minister", "President", "Governor"], ["ಪ್ರಧಾನಿ", "ರಾಷ್ಟ್ರಪತಿ", "ರಾಜ್ಯಪಾಲ"], 0],
        ["His family came from…", "ಅವರ ಕುಟುಂಬ?", ["Farmers", "Soldiers", "Traders"], ["ರೈತರು", "ಸೈನಿಕರು", "ವ್ಯಾಪಾರಿ"], 0],
      ],
      memorial: ["Haradanahalli Village", "ಹರದನಹಳ್ಳಿ", "Holenarasipura", "ಹೊಳೆನರಸೀಪುರ", "His birth village, a symbol of rural pride.", "ಗ್ರಾಮೀಣ ಹೆಮ್ಮೆಯ ಸಂಕೇತ.", "Haradanahalli Karnataka"],
    })],
  },
  {
    id: "bengaluru-urban", name: { en: "Bengaluru Urban", kn: "ಬೆಂಗಳೂರು ನಗರ" }, emoji: "🏙️",
    heroes: [mkHero({
      id: "kempegowda", emoji: "🏛️",
      name: ["Kempegowda", "ಕೆಂಪೇಗೌಡ"],
      title: ["Founder of Bengaluru", "ಬೆಂಗಳೂರಿನ ಸ್ಥಾಪಕ"],
      era: "1510 – 1569",
      pages: [
        ["A young chieftain named Kempegowda dreamed of a city full of gardens and lakes.", "ಯುವ ನಾಯಕ ಕೆಂಪೇಗೌಡ ಉದ್ಯಾನ-ಕೆರೆಗಳ ನಗರದ ಕನಸು ಕಂಡನು.", "💭"],
        ["In 1537 he founded Bengaluru and built four watch towers around it.", "1537ರಲ್ಲಿ ಬೆಂಗಳೂರನ್ನು ಸ್ಥಾಪಿಸಿ ನಾಲ್ಕು ಗೋಪುರ ಕಟ್ಟಿದನು.", "🗼"],
        ["He built lakes so every villager had water. Bengaluru remembers him with love.", "ಎಲ್ಲರಿಗೂ ನೀರಿಗಾಗಿ ಕೆರೆ ಕಟ್ಟಿದನು. ಬೆಂಗಳೂರು ಇಂದಿಗೂ ನೆನಪಿಸಿಕೊಳ್ಳುತ್ತದೆ.", "💧"],
      ],
      quiz: [
        ["Which city did he found?", "ಯಾವ ನಗರ?", ["Bengaluru", "Mysuru", "Hubballi"], ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಹುಬ್ಬಳ್ಳಿ"], 0],
        ["He built four…", "ನಾಲ್ಕು ಏನು?", ["Watch towers", "Palaces", "Bridges"], ["ಗೋಪುರಗಳು", "ಅರಮನೆ", "ಸೇತುವೆ"], 0],
      ],
      memorial: ["Kempegowda Statue", "ಕೆಂಪೇಗೌಡ ಪ್ರತಿಮೆ", "KIA Airport, Bengaluru", "ಕೆಂಪೇಗೌಡ ವಿಮಾನ ನಿಲ್ದಾಣ", "A 108-foot statue greets visitors near the airport.", "108 ಅಡಿ ಎತ್ತರದ ಪ್ರತಿಮೆ.", "Statue of Prosperity Kempegowda Bengaluru"],
    })],
  },
  {
    id: "bidar", name: { en: "Bidar", kn: "ಬೀದರ್" }, emoji: "🕌",
    heroes: [mkHero({
      id: "mahmud-gawan", emoji: "📚",
      name: ["Mahmud Gawan", "ಮಹಮ್ಮದ್ ಗವಾನ್"],
      title: ["Scholar-Minister of Bidar", "ಬೀದರಿನ ವಿದ್ವಾಂಸ ಮಂತ್ರಿ"],
      era: "1411 – 1481",
      pages: [
        ["A learned traveller named Mahmud Gawan came to Bidar and won everyone's heart.", "ವಿದ್ವಾಂಸ ಮಹಮ್ಮದ್ ಗವಾನ್ ಬೀದರಿಗೆ ಬಂದು ಎಲ್ಲರ ಮನಗೆದ್ದನು.", "🛤️"],
        ["He became Prime Minister of the Bahmani kingdom and was known for honesty.", "ಬಹಮನಿ ರಾಜ್ಯದ ಪ್ರಧಾನಿಯಾಗಿ ಪ್ರಾಮಾಣಿಕತೆಗೆ ಹೆಸರಾದನು.", "⚖️"],
        ["He built a great Madrasa — a library and school still standing today.", "ಬೀದರಿನಲ್ಲಿ ಭವ್ಯ ಮದ್ರಸಾ ಕಟ್ಟಿದನು.", "🏛️"],
      ],
      quiz: [
        ["Which kingdom did he serve?", "ಯಾವ ರಾಜ್ಯ?", ["Bahmani", "Chola", "Maratha"], ["ಬಹಮನಿ", "ಚೋಳ", "ಮರಾಠ"], 0],
        ["He built a famous…", "ಏನು ಕಟ್ಟಿದನು?", ["Madrasa", "Fort", "Bridge"], ["ಮದ್ರಸಾ", "ಕೋಟೆ", "ಸೇತುವೆ"], 0],
      ],
      memorial: ["Mahmud Gawan Madrasa", "ಮಹಮ್ಮದ್ ಗವಾನ್ ಮದ್ರಸಾ", "Bidar town", "ಬೀದರ್", "A magnificent 15th-century learning centre.", "15ನೇ ಶತಮಾನದ ಜ್ಞಾನ ಕೇಂದ್ರ.", "Mahmud Gawan Madrasa Bidar"],
    })],
  },
  {
    id: "chamarajanagar", name: { en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ" }, emoji: "🐘",
    heroes: [mkHero({
      id: "mahadeshwara", emoji: "🛕",
      name: ["Sri Male Mahadeshwara", "ಶ್ರೀ ಮಲೆ ಮಹದೇಶ್ವರ"],
      title: ["The Hill Saint", "ಬೆಟ್ಟದ ಸಂತ"],
      era: "15th Century",
      pages: [
        ["Long ago a kind saint named Mahadeshwara walked through the deep southern forests.", "ಕರುಣಾಮಯಿ ಸಂತ ಮಹದೇಶ್ವರ ದಕ್ಷಿಣ ಕಾಡುಗಳಲ್ಲಿ ಸಂಚರಿಸಿದರು.", "🌲"],
        ["He helped tribal villagers, healed the sick and even tamed a wild tiger.", "ಆದಿವಾಸಿಗಳಿಗೆ ಸಹಾಯ ಮಾಡಿ ಹುಲಿಯನ್ನೂ ಪಳಗಿಸಿದರು.", "🐯"],
        ["His message of love still echoes from the Male Mahadeshwara hills.", "ಪ್ರೀತಿಯ ಸಂದೇಶ ಇಂದಿಗೂ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.", "🌟"],
      ],
      quiz: [
        ["He is the saint of…", "ಯಾವುದರ ಸಂತ?", ["The hills", "The sea", "The desert"], ["ಬೆಟ್ಟ", "ಸಮುದ್ರ", "ಮರುಭೂಮಿ"], 0],
        ["He tamed a wild…", "ಏನನ್ನು ಪಳಗಿಸಿದರು?", ["Tiger", "Eagle", "Snake"], ["ಹುಲಿ", "ಗರುಡ", "ಹಾವು"], 0],
      ],
      memorial: ["Male Mahadeshwara Temple", "ಮಲೆ ಮಹದೇಶ್ವರ ದೇವಾಲಯ", "MM Hills, Chamarajanagar", "ಎಂಎಂ ಬೆಟ್ಟ", "A famous hill shrine in the Western Ghats.", "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯ.", "Male Mahadeshwara Hills temple"],
    })],
  },
  {
    id: "chikkaballapur", name: { en: "Chikkaballapur", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ" }, emoji: "⛰️",
    heroes: [mkHero({
      id: "sir-m-visvesvaraya", emoji: "🛠️",
      name: ["Sir M. Visvesvaraya", "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ"],
      title: ["Engineer of Modern India", "ಆಧುನಿಕ ಭಾರತದ ಎಂಜಿನಿಯರ್"],
      era: "1860 – 1962",
      pages: [
        ["In Muddenahalli a curious boy named Visvesvaraya loved water, machines and maths.", "ಮುದ್ದೇನಹಳ್ಳಿಯ ಬಾಲಕ ವಿಶ್ವೇಶ್ವರಯ್ಯನಿಗೆ ನೀರು, ಯಂತ್ರ, ಗಣಿತ ಪ್ರಿಯ.", "📐"],
        ["He grew up to design dams, bridges and the famous KRS reservoir.", "ಅಣೆಕಟ್ಟು, ಸೇತುವೆ, ಕೆಆರ್‌ಎಸ್ ಜಲಾಶಯ ವಿನ್ಯಾಸಗೊಳಿಸಿದರು.", "🌊"],
        ["His birthday — September 15 — is celebrated as Engineer's Day across India.", "ಸೆಪ್ಟೆಂಬರ್ 15 — ಎಂಜಿನಿಯರ್ಸ್ ದಿನ.", "🎉"],
      ],
      quiz: [
        ["His profession was…", "ವೃತ್ತಿ?", ["Engineer", "Doctor", "Poet"], ["ಎಂಜಿನಿಯರ್", "ವೈದ್ಯ", "ಕವಿ"], 0],
        ["Which dam did he plan?", "ಯಾವ ಅಣೆಕಟ್ಟು?", ["KRS", "Bhakra", "Hirakud"], ["ಕೆಆರ್‌ಎಸ್", "ಭಾಕ್ರಾ", "ಹಿರಾಕುಡ್"], 0],
      ],
      memorial: ["Visvesvaraya Memorial", "ವಿಶ್ವೇಶ್ವರಯ್ಯ ಸ್ಮಾರಕ", "Muddenahalli, Chikkaballapur", "ಮುದ್ದೇನಹಳ್ಳಿ", "His birth-house museum displays his medals and tools.", "ಅವರ ಜನ್ಮಮನೆ ವಸ್ತುಸಂಗ್ರಹಾಲಯ.", "Visvesvaraya Memorial Muddenahalli"],
    })],
  },
  {
    id: "chikkamagaluru", name: { en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು" }, emoji: "☕",
    heroes: [mkHero({
      id: "baba-budan", emoji: "🌱",
      name: ["Baba Budan", "ಬಾಬಾ ಬುಡನ್"],
      title: ["Saint who brought coffee to India", "ಭಾರತಕ್ಕೆ ಕಾಫಿ ತಂದ ಸಂತ"],
      era: "17th Century",
      pages: [
        ["A wandering Sufi saint named Baba Budan travelled all the way to Yemen.", "ಸೂಫಿ ಸಂತ ಬಾಬಾ ಬುಡನ್ ಯೆಮೆನ್‌ಗೆ ಪ್ರಯಾಣ ಮಾಡಿದರು.", "🐪"],
        ["He secretly carried seven coffee beans back to the hills of Chikkamagaluru.", "ಏಳು ಕಾಫಿ ಬೀಜಗಳನ್ನು ಚಿಕ್ಕಮಗಳೂರಿಗೆ ತಂದರು.", "🌱"],
        ["He planted them and gave India its very first cup of coffee!", "ಬಿತ್ತಿ ಭಾರತಕ್ಕೆ ಮೊದಲ ಕಾಫಿ ಕಪ್ ಕೊಟ್ಟರು!", "☕"],
      ],
      quiz: [
        ["He brought what to India?", "ಏನು ತಂದರು?", ["Coffee", "Tea", "Cocoa"], ["ಕಾಫಿ", "ಚಹಾ", "ಕೋಕೋ"], 0],
        ["From which country?", "ಯಾವ ದೇಶ?", ["Yemen", "Brazil", "Italy"], ["ಯೆಮೆನ್", "ಬ್ರೆಜಿಲ್", "ಇಟಲಿ"], 0],
      ],
      memorial: ["Baba Budangiri Hills", "ಬಾಬಾ ಬುಡನ್‌ಗಿರಿ", "Chikkamagaluru", "ಚಿಕ್ಕಮಗಳೂರು", "Sacred hills covered in coffee gardens.", "ಕಾಫಿ ತೋಟಗಳ ಪವಿತ್ರ ಬೆಟ್ಟ.", "Baba Budangiri Chikkamagaluru"],
    })],
  },
  {
    id: "chitradurga", name: { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ" }, emoji: "🏯",
    heroes: [mkHero({
      id: "onake-obavva", emoji: "🪵",
      name: ["Onake Obavva", "ಒನಕೆ ಓಬವ್ವ"],
      title: ["The Pestle Warrior", "ಒನಕೆಯ ವೀರಮಹಿಳೆ"],
      era: "18th Century",
      pages: [
        ["At Chitradurga fort lived a brave woman named Obavva, wife of the gate-guard.", "ಚಿತ್ರದುರ್ಗ ಕೋಟೆಯಲ್ಲಿ ಧೈರ್ಯಶಾಲಿ ಓಬವ್ವ ಇದ್ದಳು.", "🏯"],
        ["One day enemy soldiers tried to sneak in through a tiny hole in the wall.", "ಶತ್ರು ಸೈನಿಕರು ಗೋಡೆಯ ಸಣ್ಣ ರಂಧ್ರದಿಂದ ನುಸುಳಲು ಯತ್ನಿಸಿದರು.", "🕳️"],
        ["With only her wooden pestle, Obavva fought them all and saved the fort!", "ಒನಕೆಯಿಂದ ಎಲ್ಲರನ್ನೂ ಸೋಲಿಸಿ ಕೋಟೆ ಉಳಿಸಿದಳು!", "💪"],
      ],
      quiz: [
        ["What weapon did she use?", "ಆಯುಧ?", ["Wooden pestle", "Sword", "Bow"], ["ಒನಕೆ", "ಕತ್ತಿ", "ಬಿಲ್ಲು"], 0],
        ["Which fort did she save?", "ಯಾವ ಕೋಟೆ?", ["Chitradurga", "Kittur", "Bidar"], ["ಚಿತ್ರದುರ್ಗ", "ಕಿತ್ತೂರು", "ಬೀದರ್"], 0],
      ],
      memorial: ["Chitradurga Fort", "ಚಿತ್ರದುರ್ಗ ಕೋಟೆ", "Chitradurga", "ಚಿತ್ರದುರ್ಗ", "The famous fort still has the small hole where she fought.", "ಅವಳು ಹೋರಾಡಿದ ರಂಧ್ರ ಇಂದಿಗೂ ಇದೆ.", "Chitradurga Fort Obavva"],
    })],
  },
  {
    id: "dakshina-kannada", name: { en: "Dakshina Kannada", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ" }, emoji: "🌊",
    heroes: [mkHero({
      id: "rani-abbakka", emoji: "👸",
      name: ["Rani Abbakka Chowta", "ರಾಣಿ ಅಬ್ಬಕ್ಕ ಚೌಟ"],
      title: ["The Fearless Queen of Ullal", "ಉಳ್ಳಾಲದ ನಿರ್ಭೀತ ರಾಣಿ"],
      era: "16th Century",
      pages: [
        ["By the seas of Ullal ruled a brave queen named Abbakka who feared no one.", "ಉಳ್ಳಾಲದ ಧೈರ್ಯಶಾಲಿ ರಾಣಿ ಅಬ್ಬಕ್ಕ ಯಾರಿಗೂ ಹೆದರಲಿಲ್ಲ.", "🌊"],
        ["The mighty Portuguese tried to capture her port — she fought them on land and sea.", "ಪೋರ್ಚುಗೀಸರು ಬಂದರು ವಶಪಡಿಸಿಕೊಳ್ಳಲು ಬಂದಾಗ ಎರಡರಲ್ಲೂ ಹೋರಾಡಿದಳು.", "⛵"],
        ["She is called India's first woman freedom fighter against European invaders.", "ಯುರೋಪಿಯನ್ನರ ವಿರುದ್ಧ ಮೊದಲ ಮಹಿಳಾ ಸ್ವಾತಂತ್ರ್ಯ ಯೋಧೆ.", "⚔️"],
      ],
      quiz: [
        ["Whom did she fight?", "ಯಾರ ವಿರುದ್ಧ?", ["Portuguese", "British", "French"], ["ಪೋರ್ಚುಗೀಸರು", "ಬ್ರಿಟಿಷರು", "ಫ್ರೆಂಚರು"], 0],
        ["She ruled…", "ರಾಜ್ಯ?", ["Ullal", "Hampi", "Mysuru"], ["ಉಳ್ಳಾಲ", "ಹಂಪಿ", "ಮೈಸೂರು"], 0],
      ],
      memorial: ["Rani Abbakka Statue", "ರಾಣಿ ಅಬ್ಬಕ್ಕ ಪ್ರತಿಮೆ", "Ullal, Mangaluru", "ಉಳ್ಳಾಲ", "A grand statue near the Ullal sea-shore.", "ಉಳ್ಳಾಲ ಕಡಲತೀರದ ಪ್ರತಿಮೆ.", "Rani Abbakka statue Ullal"],
    })],
  },
  {
    id: "davanagere", name: { en: "Davanagere", kn: "ದಾವಣಗೆರೆ" }, emoji: "🥞",
    heroes: [mkHero({
      id: "j-h-patel", emoji: "🎤",
      name: ["J. H. Patel", "ಜೆ. ಎಚ್. ಪಟೇಲ್"],
      title: ["People's Chief Minister", "ಜನರ ಮುಖ್ಯಮಂತ್ರಿ"],
      era: "1930 – 2000",
      pages: [
        ["A witty boy named Jayadevappa from Karignur loved books and bold ideas.", "ಕರಿಗನೂರಿನ ಜಯದೇವಪ್ಪ ಪುಸ್ತಕ-ಧೈರ್ಯದ ಆಲೋಚನೆಗಳ ಪ್ರಿಯ.", "📖"],
        ["He became a powerful speaker and a beloved leader of farmers and youth.", "ಶಕ್ತಿಶಾಲಿ ಭಾಷಣಕಾರನಾಗಿ ರೈತ-ಯುವ ಪ್ರಿಯ ನಾಯಕ.", "🌾"],
        ["He served as Chief Minister of Karnataka from 1996 to 1999.", "1996-1999ರಲ್ಲಿ ಕರ್ನಾಟಕದ ಮುಖ್ಯಮಂತ್ರಿ.", "🏛️"],
      ],
      quiz: [
        ["His position?", "ಹುದ್ದೆ?", ["Chief Minister", "President", "Speaker"], ["ಮುಖ್ಯಮಂತ್ರಿ", "ರಾಷ್ಟ್ರಪತಿ", "ಸಭಾಧ್ಯಕ್ಷ"], 0],
        ["He was famous for his…", "ಪ್ರಸಿದ್ಧಿ?", ["Speeches", "Paintings", "Songs"], ["ಭಾಷಣ", "ಚಿತ್ರ", "ಹಾಡು"], 0],
      ],
      memorial: ["J. H. Patel Memorial", "ಪಟೇಲ್ ಸ್ಮಾರಕ", "Karignur, Davanagere", "ಕರಿಗನೂರು", "His birth village honours his life.", "ಅವರ ಜನ್ಮ ಗ್ರಾಮ.", "JH Patel memorial Karignur"],
    })],
  },
  {
    id: "dharwad", name: { en: "Dharwad", kn: "ಧಾರವಾಡ" }, emoji: "🎶",
    heroes: [mkHero({
      id: "bhimsen-joshi", emoji: "🎤",
      name: ["Pandit Bhimsen Joshi", "ಪಂಡಿತ್ ಭೀಮಸೇನ್ ಜೋಶಿ"],
      title: ["Legend of Hindustani Music", "ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತದ ದಂತಕಥೆ"],
      era: "1922 – 2011",
      pages: [
        ["In Gadag a small boy named Bhimsen ran away from home to learn music!", "ಸಣ್ಣ ಬಾಲಕ ಭೀಮಸೇನ ಸಂಗೀತಕ್ಕಾಗಿ ಮನೆಬಿಟ್ಟು ಓಡಿದ!", "🎵"],
        ["He travelled across India searching for the perfect guru.", "ಗುರುವಿಗಾಗಿ ಭಾರತ ಸುತ್ತಿದರು.", "🛤️"],
        ["His voice gave us 'Mile Sur Mera Tumhara' and he won the Bharat Ratna.", "'ಮಿಲೆ ಸುರ್ ಮೇರಾ ತುಮ್ಹಾರಾ' ಹಾಡಿ ಭಾರತ ರತ್ನ ಪಡೆದರು.", "🏆"],
      ],
      quiz: [
        ["His art form?", "ಕಲೆ?", ["Hindustani vocal", "Bharatanatyam", "Painting"], ["ಹಿಂದೂಸ್ತಾನಿ ಗಾಯನ", "ಭರತನಾಟ್ಯ", "ಚಿತ್ರಕಲೆ"], 0],
        ["Which honour?", "ಯಾವ ಪ್ರಶಸ್ತಿ?", ["Bharat Ratna", "Oscar", "Grammy"], ["ಭಾರತ ರತ್ನ", "ಆಸ್ಕರ್", "ಗ್ರ್ಯಾಮಿ"], 0],
      ],
      memorial: ["Bhimsen Joshi Smarak", "ಭೀಮಸೇನ್ ಸ್ಮಾರಕ", "Dharwad", "ಧಾರವಾಡ", "Dharwad's music school carries his name.", "ಧಾರವಾಡದ ಸಂಗೀತ ಶಾಲೆ.", "Bhimsen Joshi memorial Dharwad"],
    })],
  },
  {
    id: "gadag", name: { en: "Gadag", kn: "ಗದಗ" }, emoji: "📜",
    heroes: [mkHero({
      id: "kumara-vyasa", emoji: "📖",
      name: ["Kumara Vyasa", "ಕುಮಾರವ್ಯಾಸ"],
      title: ["Poet of Karnata Bharata", "ಕರ್ನಾಟ ಭಾರತದ ಕವಿ"],
      era: "15th Century",
      pages: [
        ["Under a peepal tree in Gadag a poet named Naranappa sat writing every day.", "ಗದಗದ ಅರಳಿಮರದ ಕೆಳಗೆ ಕವಿ ನಾರಣಪ್ಪ ಬರೆಯುತ್ತಿದ್ದರು.", "🌳"],
        ["He retold the Mahabharata in beautiful Kannada as 'Kumara Vyasa'.", "ಮಹಾಭಾರತವನ್ನು ಕನ್ನಡದಲ್ಲಿ ಹಾಡಿ 'ಕುಮಾರವ್ಯಾಸ' ಎನಿಸಿಕೊಂಡರು.", "📜"],
        ["His epic 'Karnata Bharata Kathamanjari' is a treasure of Kannada literature.", "ಅವರ ಕಾವ್ಯ ಕನ್ನಡದ ರತ್ನ.", "💎"],
      ],
      quiz: [
        ["Which epic did he retell?", "ಯಾವ ಕಾವ್ಯ?", ["Mahabharata", "Ramayana", "Vedas"], ["ಮಹಾಭಾರತ", "ರಾಮಾಯಣ", "ವೇದ"], 0],
        ["His real name?", "ನಿಜ ಹೆಸರು?", ["Naranappa", "Basavappa", "Puttappa"], ["ನಾರಣಪ್ಪ", "ಬಸವಪ್ಪ", "ಪುಟ್ಟಪ್ಪ"], 0],
      ],
      memorial: ["Veeranarayana Temple", "ವೀರನಾರಾಯಣ ದೇವಾಲಯ", "Gadag town", "ಗದಗ", "The temple where Kumara Vyasa wrote his epic.", "ಕುಮಾರವ್ಯಾಸ ಬರೆದ ದೇವಾಲಯ.", "Veeranarayana temple Gadag"],
    })],
  },
  {
    id: "hassan", name: { en: "Hassan", kn: "ಹಾಸನ" }, emoji: "🛕",
    heroes: [mkHero({
      id: "jakanachari", emoji: "🪨",
      name: ["Amarashilpi Jakanachari", "ಅಮರಶಿಲ್ಪಿ ಜಕಣಾಚಾರಿ"],
      title: ["Master Sculptor of Hoysala Temples", "ಹೊಯ್ಸಳ ಶಿಲ್ಪಿ"],
      era: "Legendary",
      pages: [
        ["A young sculptor named Jakanachari travelled the land turning rocks into living art.", "ಯುವ ಶಿಲ್ಪಿ ಜಕಣಾಚಾರಿ ಕಲ್ಲನ್ನು ಜೀವಂತ ಕಲೆಯಾಗಿಸಿದನು.", "🚶"],
        ["He carved the wonderful temples of Belur and Halebidu.", "ಬೇಲೂರು-ಹಳೇಬೀಡಿನ ದೇವಾಲಯ ನಿರ್ಮಿಸಿದನು.", "💃"],
        ["His chisel made stone smile — Hoysala temples remain world wonders.", "ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು ವಿಶ್ವದ ಅದ್ಭುತ.", "🌍"],
      ],
      quiz: [
        ["He carved temples at…", "ಎಲ್ಲಿ?", ["Belur & Halebidu", "Hampi", "Badami"], ["ಬೇಲೂರು ಹಳೇಬೀಡು", "ಹಂಪಿ", "ಬಾದಾಮಿ"], 0],
        ["His art was…", "ಕಲೆ?", ["Sculpture", "Music", "Poetry"], ["ಶಿಲ್ಪಕಲೆ", "ಸಂಗೀತ", "ಕಾವ್ಯ"], 0],
      ],
      memorial: ["Chennakeshava Temple", "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ", "Belur, Hassan", "ಬೇಲೂರು", "12th-century masterpiece.", "12ನೇ ಶತಮಾನದ ಕೃತಿ.", "Chennakeshava Temple Belur"],
    })],
  },
  {
    id: "haveri", name: { en: "Haveri", kn: "ಹಾವೇರಿ" }, emoji: "🌻",
    heroes: [mkHero({
      id: "kanaka-dasa", emoji: "🪕",
      name: ["Kanaka Dasa", "ಕನಕದಾಸ"],
      title: ["Saint-Poet of Equality", "ಸಮಾನತೆಯ ಸಂತ-ಕವಿ"],
      era: "1509 – 1609",
      pages: [
        ["A shepherd boy named Thimmappa from Bada loved singing to Lord Krishna.", "ಬಾಡದ ಕುರುಬ ಬಾಲಕ ತಿಮ್ಮಪ್ಪ ಕೃಷ್ಣನಿಗೆ ಹಾಡುತ್ತಿದ್ದನು.", "🎶"],
        ["He grew up to be Kanaka Dasa, a saint who taught equality.", "ಕನಕದಾಸನಾಗಿ ಸಮಾನತೆ ಬೋಧಿಸಿದನು.", "⚖️"],
        ["At Udupi the Krishna idol turned to see him — a famous miracle!", "ಉಡುಪಿಯಲ್ಲಿ ಕೃಷ್ಣನ ವಿಗ್ರಹ ಅವನನ್ನು ನೋಡಲು ತಿರುಗಿತು!", "✨"],
      ],
      quiz: [
        ["He was a saint-poet of…", "ಭಾಷೆ?", ["Kannada", "Tamil", "Telugu"], ["ಕನ್ನಡ", "ತಮಿಳು", "ತೆಲುಗು"], 0],
        ["His message?", "ಸಂದೇಶ?", ["Equality", "War", "Wealth"], ["ಸಮಾನತೆ", "ಯುದ್ಧ", "ಸಂಪತ್ತು"], 0],
      ],
      memorial: ["Kanaka Dasa Memorial", "ಕನಕದಾಸ ಸ್ಮಾರಕ", "Bada, Haveri", "ಬಾಡ, ಹಾವೇರಿ", "His birthplace temple.", "ಜನ್ಮಸ್ಥಳ ದೇವಾಲಯ.", "Kanaka Dasa memorial Bada Haveri"],
    })],
  },
  {
    id: "kalaburagi", name: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ" }, emoji: "🕌",
    heroes: [mkHero({
      id: "sharana-basaveshwara", emoji: "🪔",
      name: ["Sharana Basaveshwara", "ಶರಣ ಬಸವೇಶ್ವರ"],
      title: ["Saint of Service & Compassion", "ಸೇವೆ-ಕರುಣೆಯ ಸಂತ"],
      era: "1707 – 1773",
      pages: [
        ["A gentle child named Basaveshwara grew up serving the poor and the hungry.", "ಬಸವೇಶ್ವರ ಬಡವರ-ಹಸಿದವರ ಸೇವೆ ಮಾಡುತ್ತಾ ಬೆಳೆದರು.", "🍚"],
        ["He spread the Lingayat path of equality, hard work and devotion.", "ಲಿಂಗಾಯತ ಮಾರ್ಗ ಪಸರಿಸಿದರು.", "🪔"],
        ["His shrine at Kalaburagi welcomes lakhs of pilgrims every year.", "ಕಲಬುರಗಿಯ ಸಮಾಧಿಗೆ ಲಕ್ಷಾಂತರ ಭಕ್ತರು ಬರುತ್ತಾರೆ.", "🛕"],
      ],
      quiz: [
        ["He served the…", "ಯಾರಿಗೆ?", ["Poor", "Kings", "Soldiers"], ["ಬಡವರಿಗೆ", "ರಾಜರು", "ಸೈನಿಕರು"], 0],
        ["Shrine is in…", "ಸಮಾಧಿ?", ["Kalaburagi", "Bidar", "Hampi"], ["ಕಲಬುರಗಿ", "ಬೀದರ್", "ಹಂಪಿ"], 0],
      ],
      memorial: ["Sharana Basaveshwara Temple", "ಶರಣ ಬಸವೇಶ್ವರ ದೇವಾಲಯ", "Kalaburagi", "ಕಲಬುರಗಿ", "A grand temple at the heart of Kalaburagi.", "ಭವ್ಯ ದೇವಾಲಯ.", "Sharana Basaveshwara Temple Kalaburagi"],
    })],
  },
  {
    id: "kodagu", name: { en: "Kodagu", kn: "ಕೊಡಗು" }, emoji: "🌧️",
    heroes: [mkHero({
      id: "field-marshal-cariappa", emoji: "🎖️",
      name: ["Field Marshal K. M. Cariappa", "ಫೀಲ್ಡ್ ಮಾರ್ಷಲ್ ಕಾರ್ಯಪ್ಪ"],
      title: ["First Indian Army Chief", "ಮೊದಲ ಭಾರತೀಯ ಸೇನಾ ಮುಖ್ಯಸ್ಥ"],
      era: "1899 – 1993",
      pages: [
        ["In the green hills of Kodagu, a brave boy named Cariappa dreamed of being a soldier.", "ಕೊಡಗಿನ ಬಾಲಕ ಕಾರ್ಯಪ್ಪ ಸೈನಿಕನಾಗುವ ಕನಸು ಕಂಡನು.", "⛰️"],
        ["He joined the army and led Indian troops with great courage.", "ಸೇನೆಗೆ ಸೇರಿ ಧೈರ್ಯದಿಂದ ಮುನ್ನಡೆಸಿದನು.", "⚔️"],
        ["In 1949 he became the first Indian Commander-in-Chief of the Indian Army.", "1949ರಲ್ಲಿ ಮೊದಲ ಭಾರತೀಯ ಸೇನಾ ಮುಖ್ಯಸ್ಥ.", "🎖️"],
      ],
      quiz: [
        ["He led which force?", "ಯಾವ ಪಡೆ?", ["Indian Army", "Navy", "Air Force"], ["ಸೇನೆ", "ನೌಕಾ", "ವಾಯು"], 0],
        ["He was the FIRST…", "ಮೊದಲ?", ["Indian Army Chief", "President", "PM"], ["ಸೇನಾ ಮುಖ್ಯಸ್ಥ", "ರಾಷ್ಟ್ರಪತಿ", "ಪ್ರಧಾನಿ"], 0],
      ],
      memorial: ["Cariappa Memorial", "ಕಾರ್ಯಪ್ಪ ಸ್ಮಾರಕ", "Madikeri, Kodagu", "ಮಡಿಕೇರಿ", "His ancestral home museum.", "ಸೇನಾ ವಸ್ತುಸಂಗ್ರಹಾಲಯ.", "Cariappa memorial Madikeri"],
    })],
  },
  {
    id: "kolar", name: { en: "Kolar", kn: "ಕೋಲಾರ" }, emoji: "🪙",
    heroes: [mkHero({
      id: "kgf-miners", emoji: "⛏️",
      name: ["The Miners of Kolar Gold Fields", "ಕೆಜಿಎಫ್ ಗಣಿಗಾರರು"],
      title: ["The Brave Workers of KGF", "ಕೆಜಿಎಫ್ ಕಾರ್ಮಿಕರು"],
      era: "1880 – 2001",
      pages: [
        ["Deep below the red soil of Kolar, brave miners dug for shining gold.", "ಕೋಲಾರದ ಮಣ್ಣಿನಾಳದಲ್ಲಿ ಗಣಿಗಾರರು ಚಿನ್ನ ಅಗೆದರು.", "⛏️"],
        ["They worked night and day to give India one of the world's deepest gold mines.", "ರಾತ್ರಿ-ಹಗಲು ದುಡಿದು ಆಳವಾದ ಗಣಿ ನಿರ್ಮಿಸಿದರು.", "🌙"],
        ["KGF became a symbol of hard work and Karnataka's labour heroes.", "ಶ್ರಮದ ಸಂಕೇತ ಕೆಜಿಎಫ್.", "💪"],
      ],
      quiz: [
        ["KGF stands for…", "ಕೆಜಿಎಫ್?", ["Kolar Gold Fields", "Green Forest", "Gas Field"], ["ಚಿನ್ನದ ಗಣಿ", "ಹಸಿರು ಕಾಡು", "ಅನಿಲ"], 0],
        ["They dug for…", "ಏನು?", ["Gold", "Silver", "Coal"], ["ಚಿನ್ನ", "ಬೆಳ್ಳಿ", "ಕಲ್ಲಿದ್ದಲು"], 0],
      ],
      memorial: ["KGF Mining Heritage", "ಕೆಜಿಎಫ್ ಪರಂಪರೆ", "Kolar Gold Fields", "ಕೆಜಿಎಫ್", "Old mining shafts tell their story.", "ಹಳೆ ಗಣಿಗಳು.", "Kolar Gold Fields KGF"],
    })],
  },
  {
    id: "koppal", name: { en: "Koppal", kn: "ಕೊಪ್ಪಳ" }, emoji: "🗿",
    heroes: [mkHero({
      id: "gavi-siddeshwara", emoji: "🪔",
      name: ["Gavi Siddeshwara Swamiji", "ಗವಿ ಸಿದ್ದೇಶ್ವರ ಸ್ವಾಮೀಜಿ"],
      title: ["Saint of the Cave Math", "ಗವಿ ಮಠದ ಸಂತ"],
      era: "Modern era",
      pages: [
        ["In a quiet cave near Koppal, a saint named Siddeshwara meditated for years.", "ಕೊಪ್ಪಳದ ಗವಿಯಲ್ಲಿ ಸಿದ್ದೇಶ್ವರ ಧ್ಯಾನ ಮಾಡಿದರು.", "🧘"],
        ["He gave free food and education to poor children of every caste.", "ಬಡ ಮಕ್ಕಳಿಗೆ ಊಟ-ಶಿಕ್ಷಣ.", "🍱"],
        ["His Gavi Math at Koppal still serves thousands every day.", "ಗವಿ ಮಠ ಇಂದಿಗೂ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತದೆ.", "🪔"],
      ],
      quiz: [
        ["His math is at…", "ಮಠ?", ["Koppal", "Hubballi", "Mysuru"], ["ಕೊಪ್ಪಳ", "ಹುಬ್ಬಳ್ಳಿ", "ಮೈಸೂರು"], 0],
        ["He gave children…", "ಮಕ್ಕಳಿಗೆ?", ["Food & education", "Toys", "Coins"], ["ಊಟ ಶಿಕ್ಷಣ", "ಆಟಿಕೆ", "ನಾಣ್ಯ"], 0],
      ],
      memorial: ["Gavi Math", "ಗವಿ ಮಠ", "Koppal", "ಕೊಪ್ಪಳ", "A spiritual centre carved into ancient caves.", "ಗವಿಗಳ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರ.", "Gavi Math Koppal"],
    })],
  },
  {
    id: "mandya", name: { en: "Mandya", kn: "ಮಂಡ್ಯ" }, emoji: "🌾",
    heroes: [mkHero({
      id: "k-v-shankaregowda", emoji: "🌾",
      name: ["K. V. Shankaregowda", "ಕೆ. ವಿ. ಶಂಕರೇಗೌಡ"],
      title: ["Friend of the Farmers", "ರೈತರ ಮಿತ್ರ"],
      era: "1908 – 1979",
      pages: [
        ["A bright boy from Mandya named Shankaregowda loved sugarcane fields and books.", "ಮಂಡ್ಯದ ಶಂಕರೇಗೌಡ ಕಬ್ಬಿನ ಗದ್ದೆ-ಪುಸ್ತಕ ಪ್ರಿಯ.", "🌾"],
        ["He started sugar factories so farmers could earn more from cane.", "ಸಕ್ಕರೆ ಕಾರ್ಖಾನೆ ಆರಂಭಿಸಿದನು.", "🏭"],
        ["He was called 'Mandya Gandhi' for his honesty and service.", "'ಮಂಡ್ಯ ಗಾಂಧಿ' ಎಂದು ಕರೆಯಲ್ಪಟ್ಟರು.", "🕊️"],
      ],
      quiz: [
        ["Nicknamed…", "ಅಡ್ಡಹೆಸರು?", ["Mandya Gandhi", "Mandya Tiger", "Mandya King"], ["ಮಂಡ್ಯ ಗಾಂಧಿ", "ಹುಲಿ", "ರಾಜ"], 0],
        ["Helped which crop?", "ಬೆಳೆ?", ["Sugarcane", "Tea", "Cotton"], ["ಕಬ್ಬು", "ಚಹಾ", "ಹತ್ತಿ"], 0],
      ],
      memorial: ["Shankaregowda Memorial", "ಶಂಕರೇಗೌಡ ಸ್ಮಾರಕ", "Mandya town", "ಮಂಡ್ಯ", "Statue and hall in central Mandya.", "ಮಂಡ್ಯದ ಪ್ರತಿಮೆ.", "KV Shankaregowda Mandya"],
    })],
  },
  {
    id: "raichur", name: { en: "Raichur", kn: "ರಾಯಚೂರು" }, emoji: "🏜️",
    heroes: [mkHero({
      id: "raichur-fort-builders", emoji: "🏰",
      name: ["The Builders of Raichur Fort", "ರಾಯಚೂರು ಕೋಟೆಯ ನಿರ್ಮಾತೃಗಳು"],
      title: ["Heroes of Stone & Strength", "ಕಲ್ಲು-ಶಕ್ತಿಯ ವೀರರು"],
      era: "12th – 14th Century",
      pages: [
        ["Long ago skilled workers built a mighty fort on a rocky hill at Raichur.", "ಕಾರ್ಮಿಕರು ರಾಯಚೂರಿನ ಬಂಡೆಗುಡ್ಡದಲ್ಲಿ ಕೋಟೆ ಕಟ್ಟಿದರು.", "🪨"],
        ["They cut huge stones by hand and lifted them into thick walls.", "ಕೈಯಿಂದ ಕಲ್ಲು ಕತ್ತರಿಸಿ ಗೋಡೆ ಕಟ್ಟಿದರು.", "💪"],
        ["The Raichur Fort still stands tall — a proud symbol of craftsmanship.", "ಕೋಟೆ ಇಂದಿಗೂ ಹೆಮ್ಮೆಯಿಂದ ನಿಂತಿದೆ.", "🏰"],
      ],
      quiz: [
        ["The fort is in…", "ಎಲ್ಲಿ?", ["Raichur", "Bidar", "Hampi"], ["ರಾಯಚೂರು", "ಬೀದರ್", "ಹಂಪಿ"], 0],
        ["Built on a…", "ಎಲ್ಲಿ?", ["Rocky hill", "Beach", "Forest"], ["ಬಂಡೆಗುಡ್ಡ", "ಕಡಲತೀರ", "ಕಾಡು"], 0],
      ],
      memorial: ["Raichur Fort", "ರಾಯಚೂರು ಕೋಟೆ", "Raichur city", "ರಾಯಚೂರು", "A massive medieval fort.", "ಮಧ್ಯಯುಗದ ಕೋಟೆ.", "Raichur Fort Karnataka"],
    })],
  },
  {
    id: "ramanagara", name: { en: "Ramanagara", kn: "ರಾಮನಗರ" }, emoji: "🪨",
    heroes: [mkHero({
      id: "magadi-kempegowda-ii", emoji: "🏯",
      name: ["Magadi Kempegowda II", "ಮಾಗಡಿ ಕೆಂಪೇಗೌಡ II"],
      title: ["Builder of Magadi", "ಮಾಗಡಿಯ ನಿರ್ಮಾತೃ"],
      era: "16th – 17th Century",
      pages: [
        ["Grandson of Bengaluru's founder, he ruled the lands of Magadi.", "ಸ್ಥಾಪಕನ ಮೊಮ್ಮಗ ಮಾಗಡಿಯನ್ನು ಆಳಿದನು.", "👑"],
        ["He built strong forts and watch towers across the rocky hills of Ramanagara.", "ರಾಮನಗರದ ಬೆಟ್ಟಗಳಲ್ಲಿ ಕೋಟೆಗಳನ್ನು ಕಟ್ಟಿದನು.", "🗼"],
        ["His temples and tanks still serve villagers today.", "ದೇವಾಲಯ-ಕೆರೆಗಳು ಇಂದಿಗೂ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತವೆ.", "💧"],
      ],
      quiz: [
        ["He ruled…", "ಆಳ್ವಿಕೆ?", ["Magadi", "Hampi", "Bidar"], ["ಮಾಗಡಿ", "ಹಂಪಿ", "ಬೀದರ್"], 0],
        ["Grandfather founded…", "ಅಜ್ಜ?", ["Bengaluru", "Mysuru", "Hubballi"], ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಹುಬ್ಬಳ್ಳಿ"], 0],
      ],
      memorial: ["Savandurga Fort", "ಸಾವನದುರ್ಗ ಕೋಟೆ", "Magadi, Ramanagara", "ಮಾಗಡಿ", "Massive monolithic hill forts.", "ಬೆಟ್ಟದ ಕೋಟೆ.", "Savandurga Magadi Karnataka"],
    })],
  },
  {
    id: "tumakuru", name: { en: "Tumakuru", kn: "ತುಮಕೂರು" }, emoji: "🥥",
    heroes: [mkHero({
      id: "siddaganga-swamiji", emoji: "🪔",
      name: ["Sri Shivakumara Swamiji", "ಶ್ರೀ ಶಿವಕುಮಾರ ಸ್ವಾಮೀಜಿ"],
      title: ["The Walking God of Siddaganga", "ಸಿದ್ಧಗಂಗೆಯ ನಡೆದಾಡುವ ದೇವರು"],
      era: "1907 – 2019",
      pages: [
        ["A loving saint at Siddaganga Math fed and taught thousands of children every day.", "ಸಿದ್ಧಗಂಗಾ ಮಠದ ಸಂತರು ಸಾವಿರಾರು ಮಕ್ಕಳಿಗೆ ಊಟ-ಶಿಕ್ಷಣ ನೀಡಿದರು.", "🍱"],
        ["He gave free food, books and clothes to every child.", "ಎಲ್ಲ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಊಟ-ಪುಸ್ತಕ-ಬಟ್ಟೆ.", "📚"],
        ["He lived for 111 years and was honoured with the Padma Bhushan.", "111 ವರ್ಷ ಬಾಳಿ ಪದ್ಮಭೂಷಣ ಪಡೆದರು.", "🏆"],
      ],
      quiz: [
        ["His math is at…", "ಮಠ?", ["Siddaganga", "Hampi", "Bidar"], ["ಸಿದ್ಧಗಂಗೆ", "ಹಂಪಿ", "ಬೀದರ್"], 0],
        ["He gave children…", "?", ["Free food & education", "Money only", "Toys"], ["ಊಟ-ಶಿಕ್ಷಣ", "ಹಣ", "ಆಟಿಕೆ"], 0],
      ],
      memorial: ["Siddaganga Math", "ಸಿದ್ಧಗಂಗಾ ಮಠ", "Siddaganga, Tumakuru", "ಸಿದ್ಧಗಂಗೆ", "A huge gurukula and free school.", "ಬೃಹತ್ ಗುರುಕುಲ.", "Siddaganga Math Tumakuru"],
    })],
  },
  {
    id: "udupi", name: { en: "Udupi", kn: "ಉಡುಪಿ" }, emoji: "🍛",
    heroes: [mkHero({
      id: "madhvacharya", emoji: "🛕",
      name: ["Madhvacharya", "ಮಧ್ವಾಚಾರ್ಯ"],
      title: ["Philosopher of Udupi", "ಉಡುಪಿಯ ತತ್ವಜ್ಞಾನಿ"],
      era: "1238 – 1317",
      pages: [
        ["A clever boy named Vasudeva grew up near Udupi reading every scripture.", "ವಾಸುದೇವ ಎಂಬ ಬಾಲಕ ಎಲ್ಲ ಶಾಸ್ತ್ರಗಳನ್ನು ಓದಿದನು.", "📜"],
        ["He became Madhvacharya and founded the Krishna temple at Udupi.", "ಮಧ್ವಾಚಾರ್ಯರಾಗಿ ಉಡುಪಿ ಕೃಷ್ಣ ದೇವಾಲಯ ಸ್ಥಾಪಿಸಿದರು.", "🛕"],
        ["His Dvaita philosophy taught millions to love God with devotion.", "ದ್ವೈತ ತತ್ವ ಭಕ್ತಿ ಕಲಿಸಿತು.", "💖"],
      ],
      quiz: [
        ["Which temple did he found?", "ಯಾವ ದೇವಾಲಯ?", ["Udupi Krishna", "Hampi", "Belur"], ["ಉಡುಪಿ ಕೃಷ್ಣ", "ಹಂಪಿ", "ಬೇಲೂರು"], 0],
        ["Philosophy?", "ತತ್ವ?", ["Dvaita", "Advaita", "Yoga"], ["ದ್ವೈತ", "ಅದ್ವೈತ", "ಯೋಗ"], 0],
      ],
      memorial: ["Udupi Sri Krishna Temple", "ಉಡುಪಿ ಕೃಷ್ಣ ದೇವಾಲಯ", "Udupi town", "ಉಡುಪಿ", "Famous for the unique 'Kanakana Kindi' window.", "'ಕನಕನ ಕಿಂಡಿ'.", "Udupi Sri Krishna Matha"],
    })],
  },
  {
    id: "uttara-kannada", name: { en: "Uttara Kannada", kn: "ಉತ್ತರ ಕನ್ನಡ" }, emoji: "🌴",
    heroes: [mkHero({
      id: "shivaram-karanth", emoji: "📖",
      name: ["Dr. K. Shivaram Karanth", "ಡಾ. ಕೆ. ಶಿವರಾಮ ಕಾರಂತ"],
      title: ["Many-Sided Genius of Karnataka", "ಬಹುಮುಖ ಪ್ರತಿಭಾವಂತ"],
      era: "1902 – 1997",
      pages: [
        ["Born in Kota, a curious boy named Shivaram loved books, dance and the sea.", "ಕೋಟಾದ ಶಿವರಾಮ ಪುಸ್ತಕ-ನೃತ್ಯ-ಸಮುದ್ರ ಪ್ರಿಯ.", "🌊"],
        ["He wrote novels, taught Yakshagana and protected the Western Ghats.", "ಕಾದಂಬರಿ-ಯಕ್ಷಗಾನ-ಪರಿಸರ ರಕ್ಷಣೆ.", "🌳"],
        ["He won the Jnanpith Award and is called Karnataka's 'Walking Encyclopedia'.", "ಜ್ಞಾನಪೀಠ ಪಡೆದ 'ನಡೆದಾಡುವ ವಿಶ್ವಕೋಶ'.", "📚"],
      ],
      quiz: [
        ["Dance he revived?", "ನೃತ್ಯ?", ["Yakshagana", "Kathak", "Odissi"], ["ಯಕ್ಷಗಾನ", "ಕಥಕ್", "ಒಡಿಸ್ಸಿ"], 0],
        ["He won the…", "ಪ್ರಶಸ್ತಿ?", ["Jnanpith", "Oscar", "Grammy"], ["ಜ್ಞಾನಪೀಠ", "ಆಸ್ಕರ್", "ಗ್ರ್ಯಾಮಿ"], 0],
      ],
      memorial: ["Yakshagana Kendra", "ಯಕ್ಷಗಾನ ಕೇಂದ್ರ", "Saligrama, near Kundapura", "ಸಾಲಿಗ್ರಾಮ", "A folk-art centre he founded.", "ಯಕ್ಷಗಾನ ಕೇಂದ್ರ.", "Yakshagana Kendra Saligrama"],
    })],
  },
  {
    id: "vijayanagara", name: { en: "Vijayanagara", kn: "ವಿಜಯನಗರ" }, emoji: "🛕",
    heroes: [mkHero({
      id: "purandara-dasa", emoji: "🪕",
      name: ["Purandara Dasa", "ಪುರಂದರ ದಾಸ"],
      title: ["Father of Carnatic Music", "ಕರ್ನಾಟಕ ಸಂಗೀತದ ಪಿತಾಮಹ"],
      era: "1484 – 1564",
      pages: [
        ["A wealthy merchant named Srinivasa once cared only about gold and money.", "ವ್ಯಾಪಾರಿ ಶ್ರೀನಿವಾಸನು ಚಿನ್ನ-ಹಣದ ಚಿಂತೆಯಲ್ಲಿದ್ದನು.", "💰"],
        ["A miracle changed his heart — he gave away his riches and became Purandara Dasa.", "ಪವಾಡದಿಂದ ಸಂಪತ್ತು ತ್ಯಜಿಸಿ ಪುರಂದರ ದಾಸನಾದನು.", "✨"],
        ["He composed thousands of devotional songs that still teach Carnatic music today.", "ಸಾವಿರಾರು ಗೀತೆ ರಚಿಸಿದರು.", "🎶"],
      ],
      quiz: [
        ["Father of…", "ಪಿತಾಮಹ?", ["Carnatic music", "Pop", "Cinema"], ["ಕರ್ನಾಟಕ ಸಂಗೀತ", "ಪಾಪ್", "ಸಿನಿಮಾ"], 0],
        ["He lived during…", "ಸಾಮ್ರಾಜ್ಯ?", ["Vijayanagara", "British rule", "Mauryan"], ["ವಿಜಯನಗರ", "ಬ್ರಿಟಿಷ್", "ಮೌರ್ಯ"], 0],
      ],
      memorial: ["Purandara Mantapa", "ಪುರಂದರ ಮಂಟಪ", "Hampi, Vijayanagara", "ಹಂಪಿ", "A small mantapa by the Tungabhadra.", "ತುಂಗಭದ್ರಾ ತೀರದ ಮಂಟಪ.", "Purandara Mantapa Hampi"],
    })],
  },
  {
    id: "vijayapura", name: { en: "Vijayapura", kn: "ವಿಜಯಪುರ" }, emoji: "🕌",
    heroes: [mkHero({
      id: "ibrahim-adil-shah-ii", emoji: "🎶",
      name: ["Ibrahim Adil Shah II", "ಇಬ್ರಾಹಿಮ್ ಆದಿಲ್ ಶಾ II"],
      title: ["The Music-Loving Sultan", "ಸಂಗೀತ ಪ್ರಿಯ ಸುಲ್ತಾನ"],
      era: "1571 – 1627",
      pages: [
        ["A kind sultan named Ibrahim ruled Bijapur and loved music more than gold.", "ಸುಲ್ತಾನ ಇಬ್ರಾಹಿಮ್ ಬಿಜಾಪುರವನ್ನು ಆಳಿ ಸಂಗೀತ ಪ್ರಿಯನಾಗಿದ್ದನು.", "🎵"],
        ["He wrote a music book called 'Kitab-i-Nauras' in beautiful Dakhani.", "'ಕಿತಾಬ್-ಇ-ನೌರಸ್' ಸಂಗೀತ ಗ್ರಂಥ ಬರೆದನು.", "📖"],
        ["He honoured both Hindu and Muslim artists and built grand monuments.", "ಎಲ್ಲ ಧರ್ಮದ ಕಲಾವಿದರನ್ನು ಗೌರವಿಸಿದನು.", "🕌"],
      ],
      quiz: [
        ["He loved most…", "ಪ್ರಿಯ?", ["Music", "War", "Hunting"], ["ಸಂಗೀತ", "ಯುದ್ಧ", "ಬೇಟೆ"], 0],
        ["He ruled…", "?", ["Bijapur", "Bidar", "Bengaluru"], ["ಬಿಜಾಪುರ", "ಬೀದರ್", "ಬೆಂಗಳೂರು"], 0],
      ],
      memorial: ["Gol Gumbaz", "ಗೋಲ್ ಗುಂಬಜ್", "Vijayapura", "ವಿಜಯಪುರ", "World-famous domed mausoleum.", "ವಿಶ್ವಪ್ರಸಿದ್ಧ ಗುಂಬಜ್.", "Gol Gumbaz Vijayapura"],
    })],
  },
  {
    id: "yadgir", name: { en: "Yadgir", kn: "ಯಾದಗಿರಿ" }, emoji: "🏞️",
    heroes: [mkHero({
      id: "shorapur-venkatappa-nayaka", emoji: "🐎",
      name: ["Raja Venkatappa Nayaka", "ರಾಜ ವೆಂಕಟಪ್ಪ ನಾಯಕ"],
      title: ["The Boy King of Shorapur", "ಶೋರಾಪುರದ ಬಾಲ ರಾಜ"],
      era: "1834 – 1858",
      pages: [
        ["At Shorapur, a young prince named Venkatappa became king as a boy.", "ಶೋರಾಪುರದಲ್ಲಿ ಯುವ ರಾಜಕುಮಾರ ಬಾಲ್ಯದಲ್ಲೇ ರಾಜನಾದನು.", "👑"],
        ["When the British tried to control his land, the brave teenager raised a revolt in 1857.", "1857ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಬಂಡಾಯ ಎದ್ದನು.", "⚔️"],
        ["Though young, he is honoured as one of Karnataka's earliest freedom fighters.", "ಮೊದಲ ಸ್ವಾತಂತ್ರ್ಯ ಯೋಧರಲ್ಲಿ ಒಬ್ಬ.", "🌟"],
      ],
      quiz: [
        ["He ruled…", "?", ["Shorapur", "Mysuru", "Hampi"], ["ಶೋರಾಪುರ", "ಮೈಸೂರು", "ಹಂಪಿ"], 0],
        ["He fought against…", "ಯಾರ ವಿರುದ್ಧ?", ["British", "Mughals", "Marathas"], ["ಬ್ರಿಟಿಷರು", "ಮೊಘಲರು", "ಮರಾಠರು"], 0],
      ],
      memorial: ["Shorapur Fort", "ಶೋರಾಪುರ ಕೋಟೆ", "Shorapur, Yadgir", "ಶೋರಾಪುರ", "Hilltop fort that witnessed his brave revolt.", "ಬೆಟ್ಟದ ಕೋಟೆ.", "Shorapur Fort Yadgir"],
    })],
  },
];

export const ALL_HEROES: Hero[] = DISTRICTS.flatMap((d) => d.heroes);

export function findHero(id: string): { hero: Hero; district: District } | null {
  for (const d of DISTRICTS) {
    const h = d.heroes.find((x) => x.id === id);
    if (h) return { hero: h, district: d };
  }
  return null;
}
