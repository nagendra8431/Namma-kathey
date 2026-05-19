Here’s a project‑style description for Namma Kathey, now updated to match that you use Kannada, store stories in assets, and your GitHub branch is raspiratory:

Namma Kathey – Kannada Story Reader App
Namma Kathey is a lightweight Android storytelling app built with Kotlin and Android Studio that focuses on Kannada short stories and local narratives.
The app lets users read regional stories in a simple, distraction‑free reader interface, with all content stored locally in the assets folder for offline reading.

📱 Features

📖 Kannada Story Reader
📖 Categorized Story List (e.g., Folk, Moral, Kids, Local)
📂 Stories stored in assets (no Room / online DB)
🔖 Story List + Single‑Story Reader UI
🌐 Simple, beginner‑friendly UI for rural / non‑tech users
📱 Android‑based offline‑only reading experience

🚀 Technologies Used

Kotlin
Android Studio
Android Jetpack Components (if used ViewModel / Lifecycle)
XML Layouts (for story list and reader screens)
RecyclerView or ListView (for story list)
Gradle build system
Assets folder storage for .txt or .json stories

❓ Problem Statement

Many Kannada‑speaking users, especially in rural or semi‑urban areas, enjoy local stories but do not have easy access to them on mobile in a structured, offline‑friendly format.
Namma Kathey solves this by providing a dedicated Android app where users can browse and read Kannada stories without needing an internet connection (all stories are packaged in the app’s assets).

🎯 Objectives

Bring Kannada/local stories into a mobile‑friendly reader

Provide a clean, easy‑to‑read interface for all age groups

Support offline‑only reading via assets

Allow simple navigation between story categories

Promote Kannada language and cultural content consumption

📌 Project Description
Namma Kathey is an interactive Android educational app designed as a Regional Hero Storybook for children. It solves the problem that most children know global superheroes and famous historical figures, but are unaware of local freedom fighters, poets, and social reformers from their own district in Karnataka.

The app is for:

Children (ages 6–14) who want engaging stories in simple language

Parents and teachers looking for value-based, culturally relevant content

Kannada-speaking users who want stories in their mother tongue

It builds local pride, character, and cultural awareness through illustrated stories of heroes from every district of Karnataka.

🛠 Setup Instructions
Prerequisites
Android Studio (latest version)

JDK 11 or higher

Basic knowledge of Kotlin and Android development

Installation & Running
Clone the repository

bash
git clone https://github.com/nagendra8431/Namma-kathey.git
cd Namma-kathey
git checkout raspiratory
Open the project in Android Studio

bash
# Double-click the project folder or open via Android Studio:
# File → Open → select the Namma-kathey folder
Sync Gradle

bash
# In Android Studio:
# File → Sync Project with Gradle Files
Build and run

bash
# Use the Android Studio Run button (▶) or:
./gradlew assembleDebug
Run on emulator or device

Start an Android emulator (AVD) or connect a physical device

Ensure USB debugging is enabled if using a real device

Run the app from Android Studio

The app will launch on localhost via the emulator or your connected device. No backend or internet is required for core functionality.

✨ Features & Usage Details
Main Features
District-wise Hero Selection

Browse heroes from different districts of Karnataka

Tap a district to see its local freedom fighters, poets, and reformers

Illustrated Story Pages

Swipe through illustrated pages for each hero

Simple, child-friendly language in Kannada and English

Bilingual Support (Kannada / English)

Toggle language easily using a language switch

Stories and UI labels update instantly

Text-to-Speech Narration 🎧

Tap Read Aloud to hear the story in Kannada

Helps children who are still learning to read

3-Question Quiz per Hero 🧠

After each story, take a short quiz

Immediate feedback on correct/incorrect answers

Heritage Badge System 🏅

Earn a Heritage Badge for completing stories + quizzes

Badges are saved in the user’s profile for motivation

Statue / Memorial Finder 🗺️

View the location of the hero’s memorial or statue

Helps children connect stories to real-world places

Offline-First Design

All stories, images, and quizzes stored in local JSON and assets

No internet required after installation

How to Use the App
Open the app → you see the home screen with district options.

Tap a district (e.g., Belagavi, Bengaluru, Dharwad).

Select a hero card (e.g., Kittur Rani Chennamma, Sangolli Rayanna).

Read the story page by page using swipe gestures.

Use the language toggle to switch between Kannada and English.

Tap Read Aloud to listen to the story.

Complete the 3-question quiz.

If you answer correctly, you receive a Heritage Badge.

Use the Statue Finder screen to see where the hero’s memorial is located.

📸 Screenshots & Demo
Add screenshots or a demo link here once you have them. For now, you can use placeholders like:

Figure 1: Home screen showing district selection and hero cards

Figure 2: Story page with illustration and Kannada/English text

Figure 3: Language toggle and Read Aloud button

Figure 4: Quiz screen with 3 questions

Figure 5: Heritage Badge earned screen

Figure 6: Statue/Memorial location screen

You can insert your actual screenshots like this in the README:

text
![Home Screen](screenshots/home_screen.png)
![Story Screen](screenshots/story_screen.png)
![Quiz Screen](screenshots/quiz_screen.png)
If you have a demo video or APK link, add:

text 
📱 APK Download: [https://github.com/nagendra8431/Namma-kathey/blob/main/namma-kathey-source.zip]
You can also reference the figure style from your report:

Figure 1: Overall interface of the Namma Kathey Android app showcasing Karnataka district-wise heroes and GenAI-based content presentation

🏗 Tech Stack
Language: Kotlin

IDE: Android Studio

Architecture: MVVM (recommended)

Data Storage: Local JSON + assets folder

UI: Android Views or Jetpack Compose (as implemented)

Features: Text-to-Speech, local quizzes, badge saving, statue finder

👨‍💻 Author

Nagendra K
(Android Developer – ECE Student / Intern)

🔗 GitHub Repository

https://github.com/nagendra8431/Namma-kathey/tree/raspiratory

