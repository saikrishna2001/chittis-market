/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          primary: "#1B5E20", // Deep Forest Green
          fresh: "#4CAF50",   // Vibrant Fresh Leaf Green
          light: "#E8F5E9",   // Soft Mint Green
          orange: "#FF9800",  // Premium Accent Orange
          bg: "#FAFCF8",      // Fresh Organic Canvas
          dark: "#202B23",    // Deep Organic Charcoal
          muted: "#718071",   // Balanced Secondary Text
          accent: "#2E7D32",  // Hover Green
          cream: "#FFF9E6",   // Warm Harvest Accent
          surface: "#F4F8F3", // Card Soft Surface
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(27, 94, 32, 0.04)',
        'soft-md': '0 6px 20px rgba(27, 94, 32, 0.06)',
        'soft-lg': '0 12px 32px rgba(27, 94, 32, 0.09)',
        'soft-xl': '0 20px 48px rgba(27, 94, 32, 0.12)',
        'fresh': '0 10px 25px -5px rgba(76, 175, 80, 0.3)',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
