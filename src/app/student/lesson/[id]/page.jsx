"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import ContentCard from '@/components/ContentCard';
import Cookies from 'js-cookie';

export default function LessonView() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = Cookies.get('token');
        const res = await fetch(`https://backend-three-jet-87.vercel.app/api/lessons/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const jsonData = await res.json();
        
        if (!res.ok) {
           throw new Error(jsonData.message || "Failed to load lesson");
        }
        
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchLesson();
  }, [params.id]);

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center h-64">
           <svg className="animate-spin h-10 w-10 text-purple-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout role="student">
        <div className="text-center py-20 bg-red/10 border border-red/20 rounded-xl">
           <h2 className="text-xl text-red font-bold mb-2">Error</h2>
           <p className="text-red/80">{error || "Lesson not found"}</p>
           <button onClick={() => router.push('/student/dashboard')} className="mt-6 bg-navy px-4 py-2 rounded-lg text-text-primary hover:bg-navy-light transition-colors">
              Return to Dashboard
           </button>
        </div>
      </DashboardLayout>
    );
  }

  const { lesson, quiz } = data;

  const handleSelectAnswer = (qIndex, selectedOption) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

  const handleSubmitQuiz = () => {
    if (!quiz || !quiz.questions) return;
    
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore({ correct: correctCount, total: quiz.questions.length });
    setSubmitted(true);
  };

  return (
    <DashboardLayout role="student">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => router.push('/student/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Main Lesson Content */}
        <section>
          <div className="mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary bg-clip-text text-transparent bg-gradient-to-r from-purple-light to-purple pb-1">
              {lesson.title}
            </h1>
            <p className="text-text-muted mt-2">Adapted for {lesson.learningProfile}</p>
          </div>

          <ContentCard 
            title="Lesson Core Points"
            themeColor="navy-light"
            content={
              <ul className="list-disc pl-5 space-y-4 text-lg">
                {lesson.simplifiedPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            }
          />
        </section>

        {/* Visual Aids Suggestions */}
        {lesson.visualAidSuggestions && lesson.visualAidSuggestions.length > 0 && (
          <section>
             <ContentCard 
                title="Helpful Visualizations"
                themeColor="navy-dark"
                content={
                  <ul className="list-disc pl-5 space-y-3 text-purple-light/90">
                    {lesson.visualAidSuggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                }
             />
          </section>
        )}

        {/* Quiz Section */}
        {quiz && quiz.questions && quiz.questions.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
               <svg className="w-7 h-7 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Knowledge Check
            </h2>
            
            <div className="space-y-6">
              {quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-navy-dark border border-white/5 rounded-xl p-6 shadow-md">
                   <h3 className="text-lg font-medium text-text-primary mb-4">
                     {qIndex + 1}. {q.question}
                   </h3>
                   <div className="space-y-3">
                     {q.options.map((opt, optIndex) => {
                       const isSelected = answers[qIndex] === opt;
                       const isCorrect = opt === q.correctAnswer;
                       
                       let optionStyle = "border-white/5 bg-navy hover:bg-navy-light";
                       if (submitted) {
                         if (isCorrect) optionStyle = "border-green bg-green/10";
                         else if (isSelected && !isCorrect) optionStyle = "border-red text-red bg-red/10";
                         else optionStyle = "border-white/5 bg-navy opacity-50";
                       } else if (isSelected) {
                         optionStyle = "border-purple-light bg-purple/10";
                       }

                       return (
                         <label key={optIndex} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors group ${optionStyle} ${submitted ? 'cursor-default' : ''}`}>
                            <input 
                              type="radio" 
                              name={`question-${qIndex}`} 
                              checked={isSelected}
                              disabled={submitted}
                              onChange={() => handleSelectAnswer(qIndex, opt)}
                              className="w-4 h-4 text-purple-light bg-navy border-white/20 focus:ring-purple-light focus:ring-2 disabled:opacity-50" 
                            />
                            <span className={`text-text-muted transition-colors ${!submitted && 'group-hover:text-text-primary'} ${submitted && isCorrect ? 'text-green font-semibold' : ''} ${submitted && isSelected && !isCorrect ? 'text-red' : ''}`}>
                              {opt}
                            </span>
                         </label>
                       );
                     })}
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
               {!submitted ? (
                 <div className="flex justify-end">
                   <button 
                     onClick={handleSubmitQuiz}
                     disabled={Object.keys(answers).length !== quiz.questions.length}
                     className="bg-green hover:bg-green/80 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green/20 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                   >
                     Submit Answers
                   </button>
                 </div>
               ) : (
                 <div className="bg-navy p-6 rounded-xl border border-white/10 text-center animate-in zoom-in duration-300">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h3>
                    <p className="text-lg text-text-muted">
                      Your Score: <span className={`font-bold ${score.correct === score.total ? 'text-green' : score.correct > score.total / 2 ? 'text-yellow-400' : 'text-red'}`}>
                        {score.correct} / {score.total}
                      </span>
                    </p>
                    <button 
                      onClick={() => router.push('/student/dashboard')}
                      className="mt-6 bg-purple hover:bg-purple-light text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Return to Dashboard
                    </button>
                 </div>
               )}
            </div>
          </section>
        )}

      </div>
    </DashboardLayout>
  );
}
