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

📂 Project Structure

text
app/
 ├── java/
 ├── res/
 │   ├── layout/
 │   ├── values/
 │   └── ...
 ├── assets/
 │   ├── stories/
 │   │   ├── story1.txt
 │   │   ├── story2.txt
 │   │   └── ...
 ├── manifests/
 ├── Gradle Scripts/
⚙️ Installation Steps

1️⃣ Clone Repository

bash
git clone -b raspiratory https://github.com/nagendra8431/Namma-kathey.git
2️⃣ Open in Android Studio

Launch Android Studio

Click Open an existing Android Studio project

Select the Namma-kathey folder

3️⃣ Sync Gradle

Wait for Gradle to finish building and syncing dependencies.

4️⃣ Run Application

Connect an Android device or start an emulator

Click the ▶ Run button

📸 Screenshots

Story list screen (Kannada titles)

Story reader screen (full‑text display in Kannada)

Any splash / category screen you have

🔮 Future Enhancements

Add bookmarking (store last‑read story in SharedPreferences)

Introduce dark mode for late‑night reading

Support multiple fonts / text‑size options

Add a search bar to search story titles in Kannada

Compress and organize stories in JSON inside assets for better structure

👨‍💻 Author

Nagendra K
(Android Developer – ECE Student / Intern)

🔗 GitHub Repository

https://github.com/nagendra8431/Namma-kathey/tree/raspiratory

