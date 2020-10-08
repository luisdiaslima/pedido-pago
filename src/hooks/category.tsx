import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface CategoryCredentials {
  name: string;
  description: string;
  ecommerce: {
    from: string;
    status: boolean;
  };
  callcenter: {
    from: string;
    status: boolean;
  };
  keywords_concat: string;
  logo: string;
  logo_content_type: string;
  position: number;
  store_id: string;
  visible: boolean;
  jwt: string;
}

interface CategoryState {
  id: string;
  name: string;
  created_at: Date;
}

interface CategoryContextData {
  createCategory(data: CategoryCredentials): Promise<void>;
  removeCategory(id: string): void;
  categories: CategoryState[];
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
);

export const CategoryProvider: React.FC = ({ children }) => {
  // Estado onde será armazenado todos os Category disparados
  const [categories, setCategories] = useState<CategoryState[]>([]);

  const createCategory = useCallback(
    async ({
      name,
      description,
      ecommerce,
      callcenter,
      keyword_concat,
      logo,
      logo_content_type,
      position,
      store_id,
      visible,
      jwt,
    }) => {
      const response = await api.post(`v2/agent/category`, {
        name,
        description,
        ecommerce,
        callcenter,
        keyword_concat,
        logo,
        logo_content_type,
        position,
        store_id,
        visible,
      });

      console.log(response);
    },
    [],
  );

  const removeCategory = useCallback((id: string) => {
    setCategories(state => state.filter(category => category.id !== id));
  }, []);
  return (
    <CategoryContext.Provider
      value={{ createCategory, removeCategory, categories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory(): CategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }

  return context;
}
