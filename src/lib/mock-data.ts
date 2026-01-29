export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    aiScore: number; // 0-100
    signal: "BUY" | "SELL" | "HOLD";
    trend: "UP" | "DOWN" | "FLAT";
    history: { time: string; value: number }[]; // For sparkline
    factors: {
        momentum: number;
        volatility: number;
        institutional: number;
    }
}

export const MOCK_STOCKS: StockData[] = [
    {
        symbol: "NVDA",
        name: "NVIDIA Corp",
        price: 892.45,
        change: 12.30,
        changePercent: 1.45,
        aiScore: 94,
        signal: "BUY",
        trend: "UP",
        history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 880 + Math.random() * 20 })),
        factors: { momentum: 95, volatility: 45, institutional: 88 }
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        price: 420.15,
        change: -2.30,
        changePercent: -0.54,
        aiScore: 78,
        signal: "HOLD",
        trend: "FLAT",
        history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 418 + Math.random() * 10 })),
        factors: { momentum: 60, volatility: 20, institutional: 92 }
    },
    {
        symbol: "PLTR",
        name: "Palantir Tech",
        price: 24.50,
        change: 1.20,
        changePercent: 5.15,
        aiScore: 91,
        signal: "BUY",
        trend: "UP",
        history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 23 + Math.random() * 3 })),
        factors: { momentum: 98, volatility: 85, institutional: 45 }
    },
    {
        symbol: "TSLA",
        name: "Tesla Inc",
        price: 175.30,
        change: -5.40,
        changePercent: -2.99,
        aiScore: 45,
        signal: "SELL",
        trend: "DOWN",
        history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 180 - Math.random() * 10 })),
        factors: { momentum: 30, volatility: 90, institutional: 40 }
    },
    {
        symbol: "AAPL",
        name: "Apple Inc",
        price: 172.50,
        change: 0.50,
        changePercent: 0.29,
        aiScore: 65,
        signal: "HOLD",
        trend: "UP",
        history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 171 + Math.random() * 3 })),
        factors: { momentum: 50, volatility: 15, institutional: 85 }
    }
];

export const BRIEFING_DATA = {
    usMarket: {
        summary: "Tech sector rallies on AI innovation news, while traditional sectors lag due to rate cut uncertainty.",
        indices: [
            { name: "S&P 500", value: 5200.4, change: 0.8 },
            { name: "NASDAQ", value: 16400.2, change: 1.2 },
            { name: "DOW", value: 39100.5, change: -0.1 }
        ]
    },
    macro: {
        summary: "Fed minutes suggest caution on rate cuts. 10Y Treasury yield steady at 4.2%.",
        events: ["CPI Release: Tomorrow 08:30", "Fed Chair Speech: Friday"]
    },
    koreaImpact: [
        { symbol: "005930.KS", name: "Samsung Elec", impact: "Neutral", reason: "Memory chip price recovery priced in." },
        { symbol: "000660.KS", name: "SK Hynix", impact: "Positive", reason: "Direct beneficiary of NVDA surge." }
    ]
};
