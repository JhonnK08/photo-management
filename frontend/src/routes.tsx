import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { NonProtectedRoute } from './components/NonProtectedRoute';
import { Register } from './pages/Register';

export function RoutesApp(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <NonProtectedRoute>
              <Login />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <NonProtectedRoute>
              <Register />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
