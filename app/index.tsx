import { StatusBar, StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import * as Font from "expo-font";
import InputText from "@/components/InputText/InputText";
import { HighlightButton } from "@/components/Button/Button";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [cpfOrEmail, setCpfOrEmail] = useState("");
  const [inputLenght, setInputLenght] = useState(100);

  const formatInput = (text: string): string => {
    // Verifica se é um CPF (apenas números)
    const isPotentialCPF = /^\d+$/.test(text.replace(/[.-]/g, ""));

    if (isPotentialCPF) {
      // Remove caracteres não numéricos e limita a 11 dígitos
      const numbers = text.replace(/\D/g, "").slice(0, 11);
      
      // Aplica formatação do CPF
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      setInputLenght(14)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    } else {
      // Permite digitação normal para e-mails
      setInputLenght(100)
      return text;
    }
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        MaterialSymbols: require("@/assets/fonts/MaterialSymbolsOutlined-Regular.ttf"),
        MaterialSymbolsFilled: require("@/assets/fonts/MaterialSymbolsOutlined_Filled-Regular.ttf"),
      });
    }
    loadFont();
  }, []);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <InputText
          style={styles.input}
          label="E-mail ou CPF"
          placeholder="Digite seu e-mail ou CPF"
          inputMode="email"
          autoCapitalize="none"
          onChangeText={(text) => {
            const formatted = formatInput(text);
            setCpfOrEmail(formatted);
          }}
          value={cpfOrEmail}
          maxLength={inputLenght}
          autoComplete="email"
        />
        <InputText
          label="Senha"
          placeholder="Digite sua senha"
          password={true}
          autoCapitalize="none"
          autoComplete="password"
        />
        <Text
          style={styles.passwordRecoverText}
          onPress={() => router.push("/esqueci-senha")}
        >
          Esqueci minha senha
        </Text>
        <HighlightButton
          label="Entrar"
          style={styles.enterButton}
          onPress={() => router.push("/home")}
        />
        <Text
          style={styles.newAccountText}
          onPress={() => router.push("/criar-conta")}
        >
          Criar conta
        </Text>
      </View>
      <StatusBar barStyle={"default"} backgroundColor={"#176299"} />
    </View>
  );
}

// Mantenha os estilos conforme definido anteriormente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#176299",
    flex: 1,
    justifyContent: "flex-end",
  },
  loginContainer: {
    height: "55%",
    width: "100%",
    padding: 25,
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    marginBottom: 20,
  },
  passwordRecoverText: {
    marginTop: 10,
    alignSelf: "flex-end",
    color: "#0553E3",
  },
  enterButton: {
    marginTop: 25,
  },
  newAccountText: {
    alignSelf: "center",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 16,
    color: "rgb(23, 99, 153)",
  },
});
