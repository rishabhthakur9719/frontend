"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher'); // default role
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { success, error: authError } = await register(email, password, role);
    if (!success) setError(authError);
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center font-sans p-6 text-text-primary">
      <div className="w-full max-w-md bg-navy-light/40 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light to-purple mb-2">
            Create an Account
          </h1>
          <p className="text-text-muted text-sm">Join LessonFlow AI today</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red/10 border border-red/20 rounded-lg text-red text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`py-3 rounded-lg border font-medium transition-all ${
                  role === 'teacher' 
                    ? 'bg-purple/20 border-purple text-purple-light' 
                    : 'bg-navy border-white/10 text-text-muted hover:border-white/20'
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-3 rounded-lg border font-medium transition-all ${
                  role === 'student' 
                    ? 'bg-green/20 border-green text-green' 
                    : 'bg-navy border-white/10 text-text-muted hover:border-white/20'
                }`}
              >
                Student
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple-light focus:ring-1 focus:ring-purple-light transition-colors"
              placeholder="you@school.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple-light focus:ring-1 focus:ring-purple-light transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-purple hover:bg-purple-light text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-4 disabled:opacity-50 flex justify-center"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-light hover:text-purple font-medium transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
