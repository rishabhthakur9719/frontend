"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ContentCard from '@/components/ContentCard';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function StudentDashboard() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assigned lessons here from the API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = Cookies.get('token');
        // Let's assume the student's profile dictates what they see. Just fetching all here or filtering
        // For right now, grab all available generated lessons.
        const res = await fetch('https://backend-three-jet-87.vercel.ap/api/lessons/student-lessons', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (res.ok) {
          // Map DB keys to the component's expected structure
          const formattedLessons = data.map(dbLesson => ({
            id: dbLesson._id,
            title: dbLesson.title,
            profile: dbLesson.learningProfile,
            content: dbLesson.simplifiedPoints.map(p => `• ${p}`).join('\n')
          }));
          setLessons(formattedLessons);
        }
      } catch (error) {
        console.error("Error fetching lessons", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLessons();
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back!</h1>
        <p className="text-text-muted">Here are your assigned adapted lessons for today.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
           <svg className="animate-spin h-8 w-8 text-purple-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map(lesson => (
            <ContentCard 
              key={lesson.id}
              title={lesson.title}
              profile={lesson.profile}
              content={lesson.content}
              themeColor="navy-light"
              actionButtons={
                <Link href={`/student/lesson/${lesson.id}`}>
                  <button className="bg-purple hover:bg-purple-light text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Start Lesson
                  </button>
                </Link>
              }
            />
          ))}
          
          {lessons.length === 0 && (
            <div className="col-span-full text-center py-16 bg-navy-light/30 rounded-xl border border-white/5">
              <p className="text-text-muted">You have no lessons assigned right now.</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
