/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                primary: {
                    DEFAULT: "#fbbf24", // Amber-400
                    foreground: "#1e293b",
                },
                secondary: {
                    DEFAULT: "#1e293b", // Slate-800
                    foreground: "#f8fafc",
                },
                muted: {
                    DEFAULT: "#334155", // Slate-700
                    foreground: "#94a3b8",
                },
                accent: {
                    DEFAULT: "#1e293b",
                    foreground: "#f8fafc",
                },
                positive: "#22c55e", // Green-500
                negative: "#ef4444", // Red-500
                system: "#60a5fa",   // Blue-400
            },
            fontFamily: {
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
}
