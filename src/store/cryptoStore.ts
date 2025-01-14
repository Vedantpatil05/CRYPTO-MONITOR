import { create } from 'zustand';
import { Cryptocurrency, Alert } from '../types';
import { fetchCryptoPrices } from '../lib/api';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CryptoStore {
  cryptocurrencies: Cryptocurrency[];
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  fetchPrices: () => Promise<void>;
  createAlert: (alert: Omit<Alert, 'id' | 'created_at' | 'triggered'>) => Promise<void>;
  deleteAlert: (alertId: string) => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
  cryptocurrencies: [],
  alerts: [],
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const prices = await fetchCryptoPrices();
      set({ cryptocurrencies: prices });
      
      // Check alerts
      const { alerts } = get();
      alerts.forEach(alert => {
        const crypto = prices.find(c => c.id === alert.cryptocurrency_id);
        if (!crypto) return;

        if (
          (alert.condition === 'above' && crypto.price >= alert.target_price) ||
          (alert.condition === 'below' && crypto.price <= alert.target_price)
        ) {
          // Trigger alert
          toast.success(
            `Alert: ${crypto.name} is ${alert.condition} ${alert.target_price}!`
          );
        }
      });
    } catch (error) {
      set({ error: 'Failed to fetch prices' });
    } finally {
      set({ loading: false });
    }
  },

  createAlert: async (alert) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('alerts')
      .insert([
        {
          ...alert,
          user_id: user.id,
          triggered: false,
        },
      ])
      .select();

    if (error) throw error;
    if (data) {
      set(state => ({
        alerts: [...state.alerts, data[0]],
      }));
      toast.success('Alert created successfully!');
    }
  },

  deleteAlert: async (alertId) => {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('id', alertId);

    if (error) throw error;
    set(state => ({
      alerts: state.alerts.filter(alert => alert.id !== alertId),
    }));
    toast.success('Alert deleted successfully!');
  },
}));