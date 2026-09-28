import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { ToastProvider } from './components/common/Toast';
import './styles/global.css';
// Must load after global.css (which @imports variables.css): the skin blocks
// override the base :root and [data-theme] tokens via cascade order.
import './styles/themes.css';
import './styles/assessment.css';
// Imported last on purpose: responsive.css holds the global overflow guard,
// safe-area insets, touch targets and per-breakpoint overrides, and must win
// the cascade against the component stylesheets above.
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <JobProvider>
              <ApplicationProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </ApplicationProvider>
            </JobProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
