import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import { formatDistanceToNow } from 'date-fns';

export function CryptoList() {
  const { cryptocurrencies, loading, error } = useCryptoStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-4 glass-morphism rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cryptocurrencies.map(crypto => (
        <div
          key={crypto.id}
          className="glass-morphism rounded-xl p-6 card-hover"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">{crypto.name}</h3>
            <span className="text-blue-300">{crypto.symbol}</span>
          </div>
          
          <div className="space-y-3">
            <div className="text-2xl font-bold text-white">
              ${crypto.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            
            <div className={`flex items-center ${
              crypto.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {crypto.percent_change_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(crypto.percent_change_24h).toFixed(2)}%
            </div>
            
            <div className="text-sm text-blue-300/70">
              Updated {formatDistanceToNow(new Date(crypto.last_updated))} ago
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}