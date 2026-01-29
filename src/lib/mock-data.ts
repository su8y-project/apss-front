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

export interface Issue {
    issueId: string;
    title: string;
    importanceScore: number;
    summary: string;
    tags: string[];
}

export interface BriefingDay {
    date: string;
    issues: Issue[];
}

export interface BriefingResponse {
    status: string;
    data: BriefingDay[];
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
    // New Structure for US Market Overview / Issues
    marketIssues: {
        status: "success",
        data: Array.from({ length: 7 }, (_, i) => {
            const date = new Date('2026-01-29');
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            return {
                date: dateStr,
                issues: [
                    {
                        issueId: `ISSUE-${dateStr}-001`,
                        title: i === 0 ? "미국 연준, 금리 인하 시점 연기 시사" : `Market Analysis for ${dateStr}`,
                        importanceScore: i === 0 ? 9.5 : Number((Math.random() * 10).toFixed(1)),
                        summary: i === 0 ? "인플레이션 둔화 속도가 느려짐에 따라 연준 의장이 금리 인하 시점을 하반기로 연기할 가능성을 시사함. 이에 따라 기술주 중심의 매도세가 출회됨." : "General market movements and sector analysis based on recent economic indicators.",
                        tags: ["매크로", "금리"]
                    },
                    {
                        issueId: `ISSUE-${dateStr}-002`,
                        title: `Tech Sector Update ${dateStr}`,
                        importanceScore: Number((Math.random() * 10).toFixed(1)),
                        summary: "Analysis of major technology companies and AI sector trends.",
                        tags: ["기술", "AI"]
                    },
                    {
                        issueId: `ISSUE-${dateStr}-003`,
                        title: `Global Trade News ${dateStr}`,
                        importanceScore: Number((Math.random() * 10).toFixed(1)),
                        summary: "Updates on international trade agreements and supply chain logistics.",
                        tags: ["무역", "공급망"]
                    }
                ]
            };
        })
    } as BriefingResponse,

    // Legacy/Other sections (keeping for now unless requested to remove)
    macro: {
        summary: "Fed minutes suggest caution on rate cuts. 10Y Treasury yield steady at 4.2%.",
        events: ["CPI Release: Tomorrow 08:30", "Fed Chair Speech: Friday"]
    },
    koreaImpact: [
        { symbol: "005930.KS", name: "Samsung Elec", impact: "Neutral", reason: "Memory chip price recovery priced in." },
        { symbol: "000660.KS", name: "SK Hynix", impact: "Positive", reason: "Direct beneficiary of NVDA surge." }
    ]
};

// Rank API Types
export interface RankItem {
    ticker: string;
    name: string;
    finalScore: number;
    relatedIssues: string[];
}

export interface RankResponse {
    status: string;
    data: {
        ranks: RankItem[];
    };
}

export const MOCK_RANK_DATA: RankResponse = {
    status: "success",
    data: {
        ranks: [
            {
                ticker: "211050",
                name: "현대오토에버",
                finalScore: 100,
                relatedIssues: []
            },
            {
                ticker: "000660",
                name: "SK하이닉스",
                finalScore: 92,
                relatedIssues: ["ISSUE-20260129-002", "ISSUE-20260129-005"]
            },
            {
                ticker: "005930",
                name: "삼성전자",
                finalScore: 88,
                relatedIssues: ["ISSUE-20260129-001"]
            },
            {
                ticker: "035420",
                name: "NAVER",
                finalScore: 75,
                relatedIssues: []
            },
            {
                ticker: "068270",
                name: "셀트리온제약",
                finalScore: 43,
                relatedIssues: []
            }
        ]
    }
};

// Helper to generate full StockData from RankItem (for UI simulation)
export function enrichRankData(rank: RankItem): StockData {
    // Deterministic pseudo-random based on ticker char codes
    const seed = rank.ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const pseudoRandom = (offset: number) => {
        const x = Math.sin(seed + offset) * 10000;
        return x - Math.floor(x);
    };

    const isPositive = rank.finalScore >= 50;
    const basePrice = (pseudoRandom(1) * 200000) + 10000;
    const changePercent = (pseudoRandom(2) * 5) * (isPositive ? 1 : -1);
    const change = basePrice * (changePercent / 100);

    return {
        symbol: rank.ticker,
        name: rank.name,
        price: basePrice,
        change: change,
        changePercent: changePercent,
        aiScore: rank.finalScore,
        signal: rank.finalScore >= 80 ? "BUY" : rank.finalScore <= 40 ? "SELL" : "HOLD",
        trend: isPositive ? "UP" : "DOWN",
        history: Array.from({ length: 20 }, (_, i) => ({
            time: `${i}:00`,
            value: basePrice + (Math.sin(i + seed) * (basePrice * 0.02))
        })),
        factors: {
            momentum: Math.floor(pseudoRandom(3) * 100),
            volatility: Math.floor(pseudoRandom(4) * 100),
            institutional: Math.floor(pseudoRandom(5) * 100)
        }
    };
}

