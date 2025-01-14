import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CryptoList } from './components/CryptoList';
import { AlertForm } from './components/AlertForm';
import { AlertList } from './components/AlertList';
import { Auth } from './components/Auth';
import { useCryptoStore } from './store/cryptoStore';
import { LineChart, LogOut } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const fetchPrices = useCryptoStore(state => state.fetchPrices);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPrices();
      const interval = setInterval(fetchPrices, 60000);
      return () => clearInterval(interval);
    }
  }, [fetchPrices, user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <Auth />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      <header className="glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <LineChart className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Crypto Monitor
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-blue-200">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2 gradient-border text-sm font-medium text-white hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-white">Live Prices</h2>
            <CryptoList />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Price Alerts</h2>
              <AlertForm />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Your Alerts</h2>
              <AlertList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;