import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Successfully logged in!');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Successfully signed up! You can now log in.');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="glass-morphism p-8 rounded-xl shadow-2xl space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-blue-200/80">
              {isLogin ? 'Sign in to monitor your crypto' : 'Start your crypto journey'}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 glass-morphism border border-blue-500/20 rounded-xl bg-blue-500/5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 glass-morphism border border-blue-500/20 rounded-xl bg-blue-500/5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center py-3 px-4 gradient-border text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign in' : 'Create account'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}