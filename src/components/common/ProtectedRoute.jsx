import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from './Toast';

/**
 * Role-aware route guard.
 * - Guests are sent to /login and returned to the page they asked for.
 * - Signed-in users with the wrong role are sent back to their own home route.
 */
export default function ProtectedRoute({ allow, children }) {
  const { currentUser, role } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const notifiedRef = useRef(false);

  const isGuest = !currentUser;
  const isAllowed = !isGuest && (!allow || allow.includes(role));
  const homeRoute = role === 'recruiter' ? '/recruiter' : '/dashboard';

  useEffect(() => {
    if (isGuest || isAllowed) return;
    // Runs once per mount so React StrictMode's double-invoke cannot double-toast.
    if (notifiedRef.current) return;
    notifiedRef.current = true;
    addToast('That area is not available for your account type', 'error');
  }, [isGuest, isAllowed, addToast]);

  if (isGuest) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAllowed) {
    return <Navigate to={homeRoute} replace />;
  }

  return children;
}
