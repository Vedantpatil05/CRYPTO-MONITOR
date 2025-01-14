import React from 'react';
import { useCryptoStore } from '../store/cryptoStore';
import { Bell, Trash2 } from 'lucide-react';

export function AlertList() {
  const { alerts, cryptocurrencies, deleteAlert } = useCryptoStore();

  if (alerts.length === 0) {
    return (
      <div className="text-center text-blue-300 py-8 glass-morphism rounded-xl">
        No alerts set. Create one above to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => {
        const crypto = cryptocurrencies.find(c => c.id === alert.cryptocurrency_id);
        if (!crypto) return null;

        return (
          <div
            key={alert.id}
            className="glass-morphism rounded-xl p-4 card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {crypto.name} ({crypto.symbol})
                  </div>
                  <div className="text-sm text-blue-300">
                    Alert when price goes {alert.condition}{' '}
                    ${alert.target_price.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteAlert(alert.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}