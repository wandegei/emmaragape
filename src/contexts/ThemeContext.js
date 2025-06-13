import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('kaazi-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('kaazi-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--background', '220 15% 6%');
      document.documentElement.style.setProperty('--foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--card', '220 15% 8%');
      document.documentElement.style.setProperty('--card-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--popover', '220 15% 8%');
      document.documentElement.style.setProperty('--popover-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--primary', '142 76% 36%');
      document.documentElement.style.setProperty('--primary-foreground', '355 7% 97%');
      document.documentElement.style.setProperty('--secondary', '215 27.9% 16.9%');
      document.documentElement.style.setProperty('--secondary-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--muted', '215 27.9% 16.9%');
      document.documentElement.style.setProperty('--muted-foreground', '217.9 10.6% 64.9%');
      document.documentElement.style.setProperty('--accent', '215 27.9% 16.9%');
      document.documentElement.style.setProperty('--accent-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--destructive', '0 62.8% 30.6%');
      document.documentElement.style.setProperty('--destructive-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--border', '215 27.9% 16.9%');
      document.documentElement.style.setProperty('--input', '215 27.9% 16.9%');
      document.documentElement.style.setProperty('--ring', '142 76% 36%');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--background', '0 0% 100%');
      document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%');
      document.documentElement.style.setProperty('--card', '0 0% 100%');
      document.documentElement.style.setProperty('--card-foreground', '222.2 84% 4.9%');
      document.documentElement.style.setProperty('--popover', '0 0% 100%');
      document.documentElement.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
      document.documentElement.style.setProperty('--primary', '142.1 70.6% 45.3%');
      document.documentElement.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
      document.documentElement.style.setProperty('--secondary', '210 40% 96.1%');
      document.documentElement.style.setProperty('--secondary-foreground', '222.2 47.4% 11.2%');
      document.documentElement.style.setProperty('--muted', '210 40% 96.1%');
      document.documentElement.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      document.documentElement.style.setProperty('--accent', '210 40% 96.1%');
      document.documentElement.style.setProperty('--accent-foreground', '222.2 47.4% 11.2%');
      document.documentElement.style.setProperty('--destructive', '0 84.2% 60.2%');
      document.documentElement.style.setProperty('--destructive-foreground', '210 40% 98%');
      document.documentElement.style.setProperty('--border', '214.3 31.8% 91.4%');
      document.documentElement.style.setProperty('--input', '214.3 31.8% 91.4%');
      document.documentElement.style.setProperty('--ring', '142.1 70.6% 45.3%');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme } }, children)
  );
};

export const useTheme = () => useContext(ThemeContext);