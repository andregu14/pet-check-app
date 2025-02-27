import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

export interface Pet {
  id: string;
  name: string;
  tipo: string | null;
  raca: string;
  sexo: string | null;
  nascimento: string | null;
  description: string;
  foto?: string;
}

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  celular: string;
  genero: string | null;
  nascimento: string | null;
  password: string;
  pets: Pet[];
}

type UseOfflineStorageReturn = {
  storedData: any;
  saveData: (key: string, data: any) => Promise<void>;
  loadData: (key: string) => Promise<void>;
  deleteData: (key: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  saveUser: (user: User) => Promise<void>,
  getUsers: any,
  getUserById: any,
};

const useOfflineStorage = (): UseOfflineStorageReturn => {
  const [storedData, setStoredData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveUser = useCallback(async (user: User): Promise<void> => {
    setIsLoading(true);
    try {
      // Carrega todos os usuarios existentes
      const usersJson = await AsyncStorage.getItem("users");
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Verifica se o usuario ja existe
      const existingUserIndex = users.findIndex((u) => u.id === user.id);

      if (existingUserIndex !== -1) {
        // Atualiza usuario existente
        users[existingUserIndex] = user;
      } else {
        // Adiciona novo usuario
        users.push(user);
      }

      await AsyncStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
      setError(`Erro ao salvar dados: ${e}`);
      console.error(`Save error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUsers = useCallback(async (): Promise<User[]> => {
    try {
      const usersJson = await AsyncStorage.getItem("users");
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
      setError(`Erro ao recuperar dados: ${e}`);
      console.error(`Get users error: ${e}`);
      return [];
    }
  }, []);

  const getUserById = useCallback(
    async (userId: string): Promise<User | null> => {
      try {
        const users = await getUsers();
        return users.find((u) => u.id === userId) || null;
      } catch (e) {
        setError(`Erro ao recuperar dados: ${e}`);
        console.error(`Get users by id error: ${e}`);
        return null;
      }
    },
    []
  );

  const saveData = useCallback(async (key: string, data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredData(data);
    } catch (e) {
      setError(`Erro ao salvar dados: ${e}`);
      console.error(`Save error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadData = useCallback(async (key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue ? JSON.parse(jsonValue) : null;
      setStoredData(data);
    } catch (e) {
      setError(`Erro ao carregar dados: ${e}`);
      console.error(`Load error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteData = useCallback(async (key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await AsyncStorage.removeItem(key);
      setStoredData(null);
    } catch (e) {
      setError(`Erro ao deletar dados: ${e}`);
      console.error(`Delete error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    saveUser,
    getUsers,
    getUserById,
    storedData,
    saveData,
    loadData,
    deleteData,
    isLoading,
    error,
  };
};

export default useOfflineStorage;
