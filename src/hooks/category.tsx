import { EditItem } from 'components/EditModal';
import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';
import { useAuth } from './auth';

interface CategoryCredentials {
  name: string;
  description: string;
  logo: string;
  store_id: string;
}

interface CategoryState {
  id: string;
  name: string;
  created_at: Date;
}

interface CategoryContextData {
  getCategory(id: EditItem): Promise<any>;
  getAllCategories(): Promise<void>;
  createCategory(data: CategoryCredentials): Promise<void>;
  removeCategory(id: number): Promise<any>;
  categoriesProvider: CategoryState[];
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
);

export const CategoryProvider: React.FC = ({ children }) => {
  // Estado onde será armazenado todos os Category disparados
  const [categoriesProvider, setCategoriesProvider] = useState<CategoryState[]>(
    [],
  );

  const getAllCategories = useCallback(async (): Promise<any> => {
    try {
      const jwt = await localStorage.getItem('@PedidosPago:jwt');
      const response = await api.get('v2/store/category', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategoriesProvider(response.data.items);
    } catch (err) {
      console.log('Request not found');
    }
  }, []);

  const getCategory = useCallback(async ({ id }): Promise<any> => {
    try {
      const jwt = await localStorage.getItem('@PedidosPago:jwt');
      const response = await api.get(`v2/store/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response;
    } catch (err) {
      console.log('Request not found');
    }
  }, []);

  const createCategory = useCallback(async data => {
    const jwt = await localStorage.getItem('@PedidosPago:jwt');
    const response = await api.post(
      `v2/store/category`,
      {
        name: data.name,
        description: data.description,
        logo: data.logo,
        store_id: data.store_id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    console.log(response);
  }, []);

  const removeCategory = useCallback(async (id): Promise<any> => {
    try {
      console.log(id);
      const jwt = await localStorage.getItem('@PedidosPago:jwt');
      const response = await api.delete(`v2/store/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response;
    } catch (err) {
      console.log('Request not found');
    }
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        getAllCategories,
        getCategory,
        createCategory,
        removeCategory,
        categoriesProvider,
      }}
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
