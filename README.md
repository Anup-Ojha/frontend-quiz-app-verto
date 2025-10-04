# 🌐 Frontend Verto Quiz App

This project is the **frontend client** for the Quiz application, built using the **Angular framework**. It communicates with the **FastAPI backend** to fetch questions, submit answers, and display results.

This project was generated with **Angular CLI version 16.2.9**.

---

## 🛠️ Setup and Installation

### 1. Node.js Requirement

Node.js is required to run the Angular CLI and the development server.  
If you do not have Node.js installed, please download and install it from the [official website](https://nodejs.org).

---

### 2. Project Dependencies (Node Modules)

While the `node_modules` folder has been pushed to the repository, it's generally best practice to **regenerate dependencies locally**, especially if moving between different operating systems or environments.

#### A. Initial Dependency Check

If you encounter errors when running `ng serve`, delete the existing `node_modules` folder in your project root.

**macOS/Linux/Git Bash:**
```bash
rm -rf node_modules
```

**Windows Command Prompt:**
```bash
rmdir /s /q node_modules
```

**Windows PowerShell:**
```bash
Remove-Item -Recurse -Force node_modules
```

Then re-install dependencies using the project's configuration (`package.json`):

```bash
npm install
```

**Note:** Only use `npm init` if `package.json` is missing (which should not be the case here).

---

### 3. Backend Connection (CORS)

This frontend expects the backend API to be running on:

```
http://localhost:8000
```

Ensure your FastAPI backend server is running in a separate terminal window/tab:

```bash
uvicorn main:app --reload
```

The backend is configured to allow requests from the Angular development server (`http://localhost:4200`) via CORS.

---

## 💻 Development Server

Run the following command to start the development server:

```bash
ng serve
```

Navigate to:

```
http://localhost:4200/
```

The application will automatically reload if you change any of the source files.

#### Alternative Port

If port `4200` is in use, you can run the application on a different port (e.g., `4201`):

```bash
ng serve --port 4201
```

---

## 📝 Key Features and Views

The Angular frontend handles all routing and state management for the quiz flow:

#### Topic Selection View
- Fetches available topics from the backend (`GET /topics`)
- Allows the user to choose a quiz

#### Quiz View
- Fetches questions for the selected topic (`GET /quizzes/start/{topic_name}`)
- Manages user answers and allows navigation between questions using internal component state

#### Submission
- On completion, compiles all answers and sends them to the backend (`POST /quizzes/submit`)

#### Results View
- Displays the score and percentage returned by the backend
- Fetches questions with correct answers (`GET /quizzes/results/{topic_name}`) to facilitate result review

---

#### CORS Issues

Ensure the FastAPI backend has CORS middleware properly configured to allow requests from `http://localhost:4200`.

---

### Further Help

To get more help on the Angular CLI:

```bash
ng help
```

Or visit the [Angular CLI Documentation](https://angular.io/cli).

---

## 📄 Project Structure

```
frontend-verto-quiz/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable components
│   │   ├── services/          # API services
│   │   ├── models/            # TypeScript interfaces
│   │   └── app.module.ts      # Root module
│   ├── assets/                # Static assets
│   ├── environments/          # Environment configurations
│   └── index.html             # Main HTML file
├── angular.json               # Angular CLI configuration
├── package.json               # Node dependencies
└── README.md                  # This file
```

---

## 🚀 Technologies Used

- **Angular** 16.2.9
- **TypeScript**
- **RxJS**
- **Angular CLI**
- **FastAPI** (Backend)

---

## 📞 Support

For issues or questions, please open an issue in the repository.
Number :- 9309109229
Name :- Anup Ojha

---

**Happy Coding! 🚀**
