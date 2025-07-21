import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';

export function RoutesApp(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
