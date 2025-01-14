// Use a mock API response for development
const mockData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', quote: { USD: { price: 50000, percent_change_24h: 2.5, last_updated: new Date().toISOString() } } },
  { id: 2, name: 'Ethereum', symbol: 'ETH', quote: { USD: { price: 3000, percent_change_24h: 1.8, last_updated: new Date().toISOString() } } },
  { id: 3, name: 'Cardano', symbol: 'ADA', quote: { USD: { price: 1.2, percent_change_24h: -0.5, last_updated: new Date().toISOString() } } },
  // Add more mock data as needed
];

export async function fetchCryptoPrices() {
  try {
    // In production, uncomment this block and use the real API
    // const API_KEY = import.meta.env.VITE_COINMARKETCAP_API_KEY;
    // if (!API_KEY) {
    //   throw new Error('Missing CoinMarketCap API key');
    // }
    // const response = await fetch(
    //   'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10',
    //   {
    //     headers: {
    //       'X-CMC_PRO_API_KEY': API_KEY,
    //     },
    //   }
    // );
    // const data = await response.json();
    // return data.data.map((crypto: any) => ({...}));

    // For development, return mock data
    return mockData.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote.USD.price,
      percent_change_24h: crypto.quote.USD.percent_change_24h,
      last_updated: crypto.quote.USD.last_updated,
    }));
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
}