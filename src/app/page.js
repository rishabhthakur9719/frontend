"use client";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center font-sans text-text-primary selection:bg-purple/30 p-6">
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-purple to-red pb-2">
            LessonFlow <span className="text-text-primary text-3xl font-medium tracking-wide">AI</span>
          </h1>
          <p className="mt-4 text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Adaptive Syllabus & Lesson Plan Generator for Special Education.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-12">
          
          <Link href="/teacher/dashboard" className="group">
            <div className="h-full bg-navy-light/40 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-navy-light hover:border-purple/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple/20 text-left flex flex-col">
              <div className="w-14 h-14 bg-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple/30 transition-colors">
                <svg className="w-7 h-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-purple-light transition-colors">Teacher Portal</h2>
              <p className="text-text-muted flex-grow">Generate adaptive lesson plans, visual aids, and customized quizzes for your students.</p>
              <div className="mt-6 flex items-center text-sm font-semibold text-purple-light gap-2 opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                Enter Portal 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/student/dashboard" className="group">
            <div className="h-full bg-navy-light/40 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-navy-light hover:border-green/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green/20 text-left flex flex-col">
              <div className="w-14 h-14 bg-green/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green/30 transition-colors">
                <svg className="w-7 h-7 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-green transition-colors">Student Portal</h2>
              <p className="text-text-muted flex-grow">Access your customized learning materials and take adapted quizzes.</p>
              <div className="mt-6 flex items-center text-sm font-semibold text-green gap-2 opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                Enter Portal 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
        
        {/* Simple Footer Note */}
        <div className="pt-16 text-sm text-text-muted/60">
          <p>This is a protected application. You will be redirected to login if unauthenticated.</p>
        </div>

      </div>
    </div>
  );
}
