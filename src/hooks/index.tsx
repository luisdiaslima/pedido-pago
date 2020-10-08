import React from 'react';

import { AuthProvider } from './auth';
import { CategoryProvider } from './category';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CategoryProvider>
      <ToastProvider>{children}</ToastProvider>
    </CategoryProvider>
  </AuthProvider>
);

export default AppProvider;
