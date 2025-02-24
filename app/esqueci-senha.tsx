import { OpacityButton } from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import RadioButton from "@/components/RadioButton/RadioButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StatusBar, StyleSheet, Alert } from "react-native";

const formatCPF = (text: string): string =>  {
  const numbers = text.replace(/\D/g, "");

  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2");
}

export default function PasswordRecover() {
  const [cpf, setCpf] = useState("");
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleContinue = () => {
    setShowSecondForm(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const router = useRouter();

  function toggleAlert() {
    Alert.alert("", `${selectedOption} enviado com sucesso!`, [
      { text: "Fechar", onPress: () => router.push("/") },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />

      {!showSecondForm ? (
        <View style={styles.container}>
          <Text style={styles.passwordRecoverText}>
            Por favor digite o seu CPF.
          </Text>
          <View style={styles.inputContainer}>
            <InputText
              label="CPF"
              placeholder="000.000.000-00"
              inputMode="numeric"
              onChangeText={(text) => setCpf(formatCPF(text))}
              value={cpf}
              maxLength={14}
            />
          </View>
          <View style={styles.buttonContainer}>
            <OpacityButton
              label="Continuar" 
              style={styles.enterButton}
              disabled={cpf.replace(/\D/g, "").length !== 11}
              styleDisabled={{ opacity: 0.5 }}
              onPress={handleContinue}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.passwordRecoverText}>
            Escolha como quer receber o link para criar uma nova senha.
          </Text>
          <RadioButton
            label="E-mail"
            option="m***********s@gmail.com"
            selected={selectedOption === "E-mail"}
            onPress={() => handleOptionSelect("E-mail")}
          />
          <RadioButton
            label="SMS"
            option="*******1857"
            selected={selectedOption === "SMS"}
            onPress={() => handleOptionSelect("SMS")}
          />
          <View style={styles.buttonContainer}>
            <OpacityButton
              label="Receber Código"
              style={styles.enterButton}
              disabled={!selectedOption} // Desabilita se nenhuma opção selecionada
              styleDisabled={{ opacity: 0.5 }}
              onPress={toggleAlert}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  passwordRecoverText: {
    padding: 20,
    marginTop: 20,
    fontSize: 16,
  },
  enterButton: {
    margin: 17,
  },
  inputContainer: {
    padding: 25,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    color: "#D2D2D2",
  },
});
