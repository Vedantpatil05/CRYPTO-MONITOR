import React, { useState } from 'react';
import { useCryptoStore } from '../store/cryptoStore';
import { Bell } from 'lucide-react';

export function AlertForm() {
  const { cryptocurrencies, createAlert } = useCryptoStore();
  const [cryptoId, setCryptoId] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cryptoId || !targetPrice) return;

    try {
      await createAlert({
        cryptocurrency_id: Number(cryptoId),
        target_price: Number(targetPrice),
        condition,
        user_id: 'demo-user',
      });

      setCryptoId('');
      setTargetPrice('');
      setCondition('above');
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-morphism rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Bell className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Create Price Alert</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-1">
            Cryptocurrency
          </label>
          <select
            value={cryptoId}
            onChange={(e) => setCryptoId(e.target.value)}
            className="w-full rounded-xl glass-morphism border border-blue-500/20 bg-blue-500/5 text-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
          >
            <option value="">Select a cryptocurrency</option>
            {cryptocurrencies.map(crypto => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-200 mb-1">
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
            className="w-full rounded-xl glass-morphism border border-blue-500/20 bg-blue-500/5 text-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
          >
            <option value="above">Price goes above</option>
            <option value="below">Price goes below</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-200 mb-1">
            Target Price (USD)
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            step="0.01"
            min="0"
            className="w-full rounded-xl glass-morphism border border-blue-500/20 bg-blue-500/5 text-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            placeholder="Enter target price"
          />
        </div>

        <button
          type="submit"
          className="w-full gradient-border py-2.5 px-4 text-white hover:bg-blue-500/20 focus:outline-none transition-all duration-200"
        >
          Create Alert
        </button>
      </div>
    </form>
  );
}