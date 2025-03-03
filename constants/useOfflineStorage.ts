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

export type UpdateUserPayload = Partial<Omit<User, "id" | "pets">>;

type UseOfflineStorageReturn = {
  isLoading: boolean;
  error: string | null;
  saveUser: (user: User) => Promise<void>;
  getUsers: any;
  getUserById: any;
  deleteUser: (userID: string) => Promise<void>;
  updateUser: (userID: string, payload: UpdateUserPayload) => Promise<void>;
};

const useOfflineStorage = (): UseOfflineStorageReturn => {
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

  const deleteUser = useCallback(
    async (userID: string): Promise<void> => {
      setIsLoading(true);
      try {
        const users = await getUsers();
        const updateUsers = users.filter((user) => user.id !== userID);
        await AsyncStorage.setItem("users", JSON.stringify(updateUsers));
        console.log("Usuário deletado com sucesso");
      } catch (e) {
        setError(`Erro ao deletar usuario: ${e}`);
        console.error(`Delete user error: ${e}`);
      } finally {
        setIsLoading(false);
      }
    },
    [getUsers]
  );

  const updateUser = useCallback(
    async (userID: string, payload: UpdateUserPayload): Promise<void> => {
      setIsLoading(true);
      try {
        const users = await getUsers();
        const userIndex = users.findIndex((u) => u.id === userID);

        if (userIndex === -1) throw new Error("Usuário não encontrado");

        const updatedUser = {
          ...users[userIndex],
          ...payload,

          id: users[userIndex].id, // mantem o id
          pets: users[userIndex].pets, // mantem os pets
        };

        users[userIndex] = updatedUser;
        await AsyncStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        setError(`Erro ao atualizar usuario: ${error}`);
        console.error(`Update error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [getUsers]
  );

  return {
    saveUser,
    getUsers,
    getUserById,
    isLoading,
    error,
    deleteUser,
    updateUser,
  };
};

export default useOfflineStorage;
