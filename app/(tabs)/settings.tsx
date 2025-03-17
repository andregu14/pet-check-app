import { HighlightButton } from "@/components/Button/Button";
import InfoDisplay from "@/components/InfoDisplay/InfoDisplay";
import InputText from "@/components/InputText/InputText";
import Select from "@/components/Select/Select";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Link, useGlobalSearchParams, useRouter } from "expo-router";
import useOfflineStorage, { User } from "@/constants/useOfflineStorage";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastMessage/ToastMessage";

const genero = [
  { title: "Masculino", value: "Masculino" },
  { title: "Feminino", value: "Feminino" },
  { title: "Prefiro não informar", value: "Prefiro não informar" },
];

type HomeParams = {
  userID: string;
};

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const navigation = useNavigation();
  const params = useGlobalSearchParams<HomeParams>();
  const userID = params.userID;

  const router = useRouter();

  const { getUserById, updateUser, isLoading, error, deleteUser } =
    useOfflineStorage();

  const handleDeleteProfile = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir o seu perfil permanentemente?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: async () => {
            try {
              if (!userID) throw new Error("ID do usuario nao encontrado");
              await deleteUser(userID);
              router.replace("/");
            } catch (e) {
              Alert.alert("Erro", String(e));
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleUpdateProfile = async () => {
    try {
      if (!userID) throw new Error("ID do usuario nao encontrado");

      await updateUser(userID, {
        name: nome,
        email: email,
        celular: celular,
        genero: selectedGenero,
      });

      const updatedUser = await getUserById(userID);

      setUser(updatedUser);
      setEdit(false);
      Toast.show({
        type: "success",
        text1: "Dados Alterados",
        text2: "Dados salvos com sucesso",
        visibilityTime: 4000,
        topOffset: 1,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar conta",
        text2: error.toString(),
        visibilityTime: 4000,
        topOffset: 1,
      });
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserById(userID);
      setUser(userData);
      setSelectedGenero(userData.genero);
      setNome(userData.name);
      setEmail(userData.email);
      setCelular(userData.celular);
    };
    loadUserData();
  }, [userID]);

  // useEffect para controlar o header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        edit && (
          <Pressable onPress={() => setEdit(false)} style={{ marginRight: 20 }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>Cancelar</Text>
          </Pressable>
        ),
    });
  }, [edit, navigation]);

  return (
    <>
      <KeyboardAwareScrollView style={styles.container}>
        {!edit ? (
          <View style={styles.infoContainer}>
            <InfoDisplay label="Nome completo" info={user?.name} />
            <InfoDisplay label="CPF" info={user?.cpf} />
            <InfoDisplay label="Email" info={user?.email} />
            <InfoDisplay label="DDD + Celular" info={user?.celular} />
            <InfoDisplay label="Gênero" info={user?.genero} select={true} />
            <InfoDisplay
              label="Data de nascimento"
              info={user?.nascimento}
              date={true}
            />
            <InfoDisplay label="Senha" info="*******" />
            <Link
              style={styles.passwordTxt}
              href={{ pathname: "/changePassword", params: { userID: userID } }}
            >
              Alterar Senha
            </Link>
            <HighlightButton
              style={styles.btnContainer}
              altStyle={true}
              onPress={() => {
                setEdit(true);
              }}
              label="Alterar Perfil"
            />
            <HighlightButton
              buttonStyle={{ backgroundColor: "rgb(255, 44, 44)" }}
              altStyle={true}
              onPress={handleDeleteProfile}
              label="Deletar Perfil"
            />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <InputText
              label="Nome completo"
              placeholder="Nome Completo"
              value={nome}
              onChangeText={(text) => setNome(text)}
            ></InputText>
            <InfoDisplay label="CPF" info={user?.cpf} />
            <InputText
              label="Email"
              placeholder="email@email.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></InputText>
            <InputText
              label="DDD + Celular"
              placeholder="(00) 00000 0000"
              value={celular}
              onChangeText={(text) => setCelular(text)}
            ></InputText>
            <Select
              data={genero}
              label="Gênero"
              placeholder="Selecione o seu gênero"
              obrigatorio={true}
              onSelect={(item) => setSelectedGenero(item.value)}
              value={selectedGenero}
              useValidation={false}
            />
            <InfoDisplay
              label="Data de nascimento"
              info={user?.nascimento}
              date={true}
            />
            <HighlightButton
              style={styles.btnContainer}
              onPress={handleUpdateProfile}
              label="Salvar Alterações"
            />
          </View>
        )}
      </KeyboardAwareScrollView>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexGrow: 1,
  },
  infoContainer: {
    margin: 25,
    gap: 22,
  },
  passwordTxt: {
    alignSelf: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  btnContainer: {
    marginTop: 20,
  },
});
