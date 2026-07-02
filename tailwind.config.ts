import type { Config } from "tailwindcss";

function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: withOpacity("--canvas"),
        surface: withOpacity("--surface"),
        "surface-dim": withOpacity("--surface-dim"),
        "surface-bright": withOpacity("--surface-bright"),
        "surface-container": withOpacity("--surface-container"),
        "surface-container-low": withOpacity("--surface-container-low"),
        "surface-container-high": withOpacity("--surface-container-high"),
        "surface-container-highest": withOpacity("--surface-container-highest"),
        "text-primary": withOpacity("--text-primary"),
        "text-secondary": withOpacity("--text-secondary"),
        "text-muted": withOpacity("--text-muted"),
        border: withOpacity("--border"),
        "border-soft": withOpacity("--border-soft"),
        accent: withOpacity("--accent"),
        "accent-green": withOpacity("--accent-green"),
        "accent-green-light": withOpacity("--accent-green-light"),
        "accent-green-dim": withOpacity("--accent-green-dim"),
        muted: withOpacity("--text-muted"),
        "sidebar-bg": withOpacity("--sidebar-bg"),
        "header-bg": withOpacity("--header-bg"),
        "status-success": withOpacity("--status-success"),
        "status-warning": withOpacity("--status-warning"),
        "status-danger": withOpacity("--status-danger"),
        "status-warning-on-tint": withOpacity("--status-warning-on-tint"),
        "status-danger-on-tint": withOpacity("--status-danger-on-tint"),
        "status-success-on-tint": withOpacity("--status-success-on-tint"),
        phase: {
          requirements: "#3d8b5e",
          architecture: "#565e74",
          code: "#3d8b5e",
          testing: "#565e74",
          deployment: "#76777d",
          maintenance: "#76777d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        control: "10px",
        badge: "4px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.04)",
        card: "0 1px 3px rgba(0,0,0,0.06)",
        glow: "0 0 0 2px rgba(99,102,241,0.15)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        theme: "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
