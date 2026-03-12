"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ContentCard from '@/components/ContentCard';
import Cookies from 'js-cookie';

export default function TeacherDashboard() {
  const [standardText, setStandardText] = useState('');
  const [learningProfile, setLearningProfile] = useState('ADHD');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState(null);
  const [error, setError] = useState('');
  const [lessons, setLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  const fetchLessons = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch('https://backend-three-jet-87.vercel.app/api/lessons/teacher-lessons', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setLessons(data);
    } catch (err) {
      console.error('Failed to fetch lessons', err);
    } finally {
      setLoadingLessons(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setGeneratedLesson(null);

    try {
      // Retrieve the JWT from cookies set by AuthContext
      const token = Cookies.get('token'); 
      
      const response = await fetch('https://backend-three-jet-87.vercel.app/api/lessons/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title,
          standardText,
          learningProfile
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Generation failed');
      
      setGeneratedLesson(data);
      fetchLessons(); // Refresh list after saving
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson? This will also delete any associated quizzes.')) return;
    
    try {
      const token = Cookies.get('token');
      const res = await fetch(`https://backend-three-jet-87.vercel.app/api/lessons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setLessons(lessons.filter(l => l._id !== id));
        if (generatedLesson && generatedLesson.lesson._id === id) {
          setGeneratedLesson(null); // Clear preview if deleted
        }
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson', error);
      alert('Error deleting lesson');
    }
  };

  return (
    <DashboardLayout role="teacher">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form Column */}
        <section className="space-y-6">
          <div className="bg-navy-light rounded-xl p-6 border border-white/5 shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Create New Lesson
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Lesson Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple-light focus:ring-1 focus:ring-purple-light transition-colors"
                  placeholder="e.g. Introduction to Cells"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Standard Syllabus/Lesson Text</label>
                <textarea 
                  required
                  rows="6"
                  value={standardText}
                  onChange={(e) => setStandardText(e.target.value)}
                  className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple-light focus:ring-1 focus:ring-purple-light transition-colors resize-none"
                  placeholder="Paste the standard educational text here..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Target Learning Profile</label>
                <select 
                  value={learningProfile}
                  onChange={(e) => setLearningProfile(e.target.value)}
                  className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple-light focus:ring-1 focus:ring-purple-light appearance-none"
                >
                  <option value="ADHD">ADHD / Focus Challenges</option>
                  <option value="Dyslexia">Dyslexia / Reading Difficulties</option>
                  <option value="Autism">Autism / Sensory Processing</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-purple hover:bg-purple-light text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adapting Lesson...
                  </>
                ) : 'Generate Adapted Materials'}
              </button>
              
              {error && <p className="text-red text-sm text-center mt-2">{error}</p>}
            </form>
          </div>
        </section>

        {/* Output Column */}
        <section className="space-y-6">
          {generatedLesson ? (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <ContentCard 
                  title={`${generatedLesson.lesson.title} - Simplified`}
                  profile={learningProfile}
                  content={
                    <ul className="list-disc pl-5 space-y-3">
                      {generatedLesson.lesson.simplifiedPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  }
                  themeColor="navy-light"
               />

               <ContentCard 
                  title="Visual Aid & Format Suggestions"
                  themeColor="navy-dark"
                  content={
                    <ul className="list-disc pl-5 space-y-3 text-purple-light/90">
                      {generatedLesson.lesson.visualAidSuggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  }
               />
               
               <ContentCard 
                  title="Adaptive Quiz Material"
                  themeColor="navy-light"
                  content={
                    <div className="space-y-4">
                      {generatedLesson.quizData.map((q, i) => (
                         <div key={i} className="mb-4 bg-navy p-4 rounded-lg border border-white/5">
                            <p className="font-semibold text-text-primary mb-2">Q{i+1}: {q.question}</p>
                            <ul className="pl-4 space-y-1 text-sm text-text-muted">
                              {q.options.map((opt, optIdx) => (
                                <li key={optIdx}>• {opt}</li>
                              ))}
                            </ul>
                            <p className="mt-2 text-xs text-green font-medium">Answer: {q.correctAnswer}</p>
                         </div>
                      ))}
                    </div>
                  }
               />
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/10 rounded-xl bg-navy-light/50">
               <svg className="w-16 h-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
               <h3 className="text-lg font-medium text-text-muted mb-2">Awaiting Generation</h3>
               <p className="text-sm text-white/40 max-w-xs">Fill out the standard syllabus and target profile on the left to generate adapted materials.</p>
            </div>
          )}
        </section>

      </div>

      {/* Created Lessons Section */}
      <section className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
          <svg className="w-7 h-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          My Created Lessons
        </h2>

        {loadingLessons ? (
           <div className="flex justify-center p-8">
             <svg className="animate-spin h-8 w-8 text-purple-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
           </div>
        ) : lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessons.map(lesson => (
              <ContentCard 
                key={lesson._id}
                title={lesson.title}
                profile={lesson.learningProfile}
                content={`Created on: ${new Date(lesson.createdAt).toLocaleDateString()}`}
                themeColor="navy"
                actionButtons={
                  <button 
                    onClick={() => handleDelete(lesson._id)}
                    className="bg-red/10 hover:bg-red text-red hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Plan
                  </button>
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-navy-light/30 rounded-xl border border-white/5">
            <p className="text-text-muted">You haven't generated any lessons yet.</p>
          </div>
        )}
      </section>

    </DashboardLayout>
  );
}
