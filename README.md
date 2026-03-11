# LessonFlow AI

An adaptive syllabus and lesson plan generator built with Next.js, designed to streamline educational content creation for teachers and provide personalized learning experiences for students.

## Features

- **Role-based Authentication**: Separate dashboards for students and teachers
- **Adaptive Learning**: Personalized lesson plans based on student progress
- **Modern UI**: Built with Tailwind CSS for a clean, responsive interface
- **Secure Sessions**: Cookie-based authentication for user sessions

## Tech Stack

- **Framework**: Next.js 16
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Authentication**: Custom context-based auth with js-cookie
- **Language**: JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│   ├── student/
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   └── lesson/
│   │       └── [id]/
│   │           └── page.jsx
│   └── teacher/
│       └── dashboard/
│           └── page.jsx
├── components/
│   ├── ContentCard.jsx
│   ├── DashboardLayout.jsx
│   └── RoleBadge.jsx
└── context/
    └── AuthContext.jsx
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Usage

1. **Registration/Login**: Users can register and login with different roles (student/teacher)
2. **Teacher Dashboard**: Create and manage syllabi and lesson plans
3. **Student Dashboard**: Access personalized lessons and track progress
4. **Lesson Pages**: Interactive lesson content with adaptive features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
