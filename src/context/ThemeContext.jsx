import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { DEFAULT_THEME, isValidTheme } from '../data/accents';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'sb_theme';
const SKIN_STORAGE_KEY = 'sb_skin';

/* One place that mirrors the React colour scheme + skin onto <html>, so the
   first paint and the animated switch always end up with the exact same markup. */
function applyThemeToDom(nextTheme, nextSkin = DEFAULT_THEME) {
  const root = document.documentElement;
  if (nextTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  } else {
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
  }
  root.setAttribute('data-skin', nextSkin);
}

/* Runs a state change through the shared circle-reveal transition. Returns the
   transition (or null when the browser has no View Transitions support or the
   user asked for less motion), letting callers keep the existing instant swap. */
function revealThemeChange(root, activeReveal, applyChange) {
  const canReveal =
    typeof document.startViewTransition === 'function' &&
    !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (!canReveal) {
    applyChange();
    return null;
  }

  // Centre of the screen → farthest corner: covers the viewport completely.
  root.style.setProperty(
    '--theme-reveal-radius',
    `${Math.hypot(window.innerWidth / 2, window.innerHeight / 2)}px`
  );

  // The attributes are written inside the callback so the captured "new"
  // snapshot already shows the incoming colours; flushSync keeps React's
  // theme/accent state (icons, labels, swatches) in the same frame.
  const reveal = document.startViewTransition(() => {
    flushSync(applyChange);
  });

  activeReveal.current = reveal;
  reveal.finished
    .catch(() => {})
    .then(() => {
      if (activeReveal.current === reveal) {
        root.style.removeProperty('--theme-reveal-radius');
      }
    });
  return reveal;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Check user system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [skin, setSkinState] = useState(() => {
    const saved = localStorage.getItem(SKIN_STORAGE_KEY);
    return isValidTheme(saved) ? saved : DEFAULT_THEME;
  });

  /* Whichever reveal is the most recent one owns the radius variable, so a
     transition that gets skipped by a rapid second click cannot clean up the
     variable the newer reveal still needs. */
  const activeReveal = useRef(null);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(SKIN_STORAGE_KEY, skin);
    applyThemeToDom(theme, skin);
  }, [theme, skin]);

  /* Switch colour scheme with a circle that grows out from the centre of the
     screen instead of repainting the whole page in one frame. Browsers without
     the View Transitions API — or users who asked for less motion — keep the
     original instant swap. The reveal itself is the `themeReveal` keyframes in
     global.css; only the radius has to come from here because the viewport
     size is only known at click time. */
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;

    revealThemeChange(root, activeReveal, () => {
      applyThemeToDom(nextTheme, skin);
      setTheme(nextTheme);
    });
  };

  /* Switch the full-site theme with the same centre reveal. Each theme repaints
     surfaces, ink, borders, gradients and the footer, not just brand chrome.
     Unknown ids are ignored so a stale stored value can never blank the theme
     layer. */
  const setSkin = (nextSkin) => {
    if (!isValidTheme(nextSkin) || nextSkin === skin) return;
    const root = document.documentElement;

    revealThemeChange(root, activeReveal, () => {
      applyThemeToDom(theme, nextSkin);
      setSkinState(nextSkin);
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === 'dark', skin, setSkin }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
