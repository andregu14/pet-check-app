import { HighlightButton } from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import useOfflineStorage, { User } from "@/constants/useOfflineStorage";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

type HomeParams = {
  userID: string;
};

export default function changePassword() {
  const [user, setUser] = useState<User | null>(null);
  const params = useGlobalSearchParams<HomeParams>();
  const userID = params.userID;
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { getUserById, updateUser, isLoading, error } = useOfflineStorage();
  const router = useRouter();

  const handleUpdateProfile = async () => {
    try {
      if (!userID) throw new Error("ID do usuario nao encontrado");
      const user = await getUserById(userID);

      if (user?.password !== password) throw new Error("Senha atual incorreta");

      await updateUser(userID, {
        password: newPassword,
      });

      const updatedUser = await getUserById(userID);
      setPassword("");
      setNewPassword("");

      setUser(updatedUser);
    } catch (error) {
      Alert.alert("Erro ao salvar", String(error));
    } finally {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <InputText
          label="Senha"
          placeholder="Digite sua senha atual"
          password={true}
          autoCapitalize="none"
          obrigatorio={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <InputText
          label="Nova Senha"
          placeholder="Digite a sua nova senha"
          password={true}
          autoCapitalize="none"
          obrigatorio={true}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
          }}
        />
        <InputText
          label="Confirmar senha"
          placeholder="Confirme a sua nova senha"
          password={true}
          autoCapitalize="none"
          obrigatorio={true}
        />
        <HighlightButton
          label="Salvar"
          style={styles.saveButton}
          onPress={handleUpdateProfile}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexGrow: 1,
  },
  formContainer: {
    margin: 25,
    marginTop: 70,
    gap: 22,
  },
  saveButton: {
    marginTop: "45%",
  },
});
