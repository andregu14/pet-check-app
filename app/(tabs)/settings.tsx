import { HighlightButton } from "@/components/Button/Button";
import InfoDisplay from "@/components/InfoDisplay/InfoDisplay";
import InputText from "@/components/InputText/InputText";
import Select from "@/components/Select/Select";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

const genero = [
  { title: "Masculino", value: "M" },
  { title: "Feminino", value: "F" },
  { title: "Prefiro não informar", value: "NI" },
];

export default function Settings() {
  const [edit, setEdit] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const navigation = useNavigation();

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
    <KeyboardAwareScrollView style={styles.container}>
      {!edit ? (
        <View style={styles.infoContainer}>
          <InfoDisplay label="Nome completo" info="Nome Completo" />
          <InfoDisplay label="CPF" info="000.000.000-00" />
          <InfoDisplay label="Email" info="email@email.com" />
          <InfoDisplay label="DDD + Celular" info="(00) 00000 0000" />
          <InfoDisplay
            label="Gênero"
            info="Selecione o seu gênero"
            select={true}
          />
          <InfoDisplay
            label="Data de nascimento"
            info="dd/mm/aaaa"
            date={true}
          />
          <InfoDisplay label="Senha" info="*******" />
          <Link style={styles.passwordTxt} href={"/changePassword"}>
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
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <InputText
            label="Nome completo"
            placeholder="Nome Completo"
          ></InputText>
          <InfoDisplay label="CPF" info="000.000.000-00" />
          <InputText label="Email" placeholder="email@email.com"></InputText>
          <InputText
            label="DDD + Celular"
            placeholder="(00) 00000 0000"
          ></InputText>
          <Select
            data={genero}
            label="Gênero"
            placeholder="Selecione o seu gênero"
            obrigatorio={true}
            onSelect={(item) => setSelectedGenero(item.value)}
            value={selectedGenero}
          />
          <InfoDisplay
            label="Data de nascimento"
            info="dd/mm/aaaa"
            date={true}
          />
          <HighlightButton
            style={styles.btnContainer}
            onPress={() => {
              setEdit(false);
            }}
            label="Salvar Alterações"
          />
        </View>
      )}
    </KeyboardAwareScrollView>
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
