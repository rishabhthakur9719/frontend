"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On mount, check if token exists
  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      // Optional: Since JWT is stateless we can trust the token format for role decoding
      // if you don't want a dedicated `/me` endpoint.
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setUser(payload);
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('https://backend-three-jet-87.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      Cookies.set('token', data.token, { expires: 1 }); // expires in 1 day
      setToken(data.token);
      setUser(data.user);

      // Route based on role
      router.push(`/${data.user.role}/dashboard`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, role) => {
    try {
      const res = await fetch('https://backend-three-jet-87.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      Cookies.set('token', data.token, { expires: 1 });
      setToken(data.token);
      setUser(data.user);

      router.push(`/${data.user.role}/dashboard`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
