import DatePicker from "@/components/DatePicker/DatePicker.android";
import InputText from "@/components/InputText/InputText";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Select from "@/components/Select/Select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { OpacityButton } from "@/components/Button/Button";
import PhotoPicker from "@/components/PhotoPicker/PhotoPicker";
import * as ImagePicker from "expo-image-picker";

const genero = [
  { title: "Masculino", value: "M" },
  { title: "Feminino", value: "F" },
  { title: "Prefiro não informar", value: "NI" },
];

const tipo = [
  { title: "Gato", value: "gato" },
  { title: "Cachorro", value: "cachorro" },
];

const sexo = [
  { title: "Macho", value: "M" },
  { title: "Fêmea", value: "F" },
];

const formatCPF = (text: string): string => {
  const numbers = text.replace(/\D/g, "");

  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2");
};

const formatPhoneNumber = (text: string): string => {
  const numbers = text.replace(/\D/g, "").slice(0, 11);

  if (numbers.length === 0) return "";
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
    7,
    11
  )}`;
};

export default function CriarConta() {
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [datePet, setDatePet] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [namePet, setNamePet] = useState("");
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);

  const handleContinue = () => setShowSecondForm(true);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("Selecione uma imagem");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.progressContainer}>
        <ProgressBar
          disabled={showSecondForm}
          onPress={() => setShowSecondForm(false)}
        />
        <ProgressBar disabled={!showSecondForm} />
      </View>
      {!showSecondForm ? (
        <View style={styles.inputContainer}>
          <InputText
            label="Nome completo"
            placeholder="Digite seu nome completo"
            obrigatorio={true}
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <InputText
            label="CPF"
            placeholder="000.000.000-00"
            obrigatorio={true}
            keyboardType="number-pad"
            value={cpf}
            onChangeText={(text) => setCpf(formatCPF(text))}
            maxLength={14}
          />
          <InputText
            label="E-mail"
            placeholder="Digite o seu e-mail"
            obrigatorio={true}
            inputMode="email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <InputText
            label="DDD + Celular"
            placeholder="(00) 00000 0000"
            obrigatorio={true}
            inputMode="tel"
            value={celular}
            onChangeText={(text) => setCelular(formatPhoneNumber(text))}
            maxLength={15}
          />
          <Select
            data={genero}
            label="Gênero"
            placeholder="Selecione o seu gênero"
            obrigatorio={true}
            onSelect={(item) => setSelectedGenero(item.value)}
            value={selectedGenero}
          />
          <DatePicker
            label="Data de nascimento"
            placeholder="dd/mm/aaaa"
            onChange={setDate}
            value={date}
          />
          <InputText
            label="Senha"
            placeholder="Digite a sua senha"
            obrigatorio={true}
            password={true}
            autoCapitalize="none"
          />
          <InputText
            label="Confirmar Senha"
            placeholder="Confirme a sua senha"
            obrigatorio={true}
            password={true}
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <OpacityButton
              label="Continuar"
              disabled={false}
              styleDisabled={{ opacity: 0.5 }}
              onPress={handleContinue}
            />
          </View>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <PhotoPicker
            label="Escolha uma foto do seu pet"
            onPress={pickImageAsync}
            image={selectedImage}
          />
          <InputText
            label="Nome do seu pet"
            placeholder="Digite o nome do seu pet"
            obrigatorio={true}
            value={namePet}
            onChangeText={(e) => setNamePet(e)}
          />
          <Select
            label="Tipo"
            obrigatorio={true}
            placeholder="Selecione o tipo do seu pet"
            data={tipo}
            onSelect={(item) => setSelectedTipo(item.value)}
            value={selectedTipo}
          />
          <InputText
            label="Raça"
            placeholder="Digite a raça do seu pet"
            obrigatorio={true}
            inputMode="text"
            keyboardType="default"
          />
          <Select
            label="Sexo"
            obrigatorio={true}
            placeholder="Selecione o sexo do seu pet"
            data={sexo}
            onSelect={(item) => setSelectedSexo(item.value)}
            value={selectedSexo}
          />
          <DatePicker
            label="Data de nascimento do seu pet"
            placeholder="dd/mm/aaaa"
            onChange={setDatePet}
            value={datePet}
          />
          <InputText
            label="Descrição"
            placeholder="Digite uma breve descrição do seu pet"
            obrigatorio={true}
            inputMode="text"
            keyboardType="default"
          />

          <View style={styles.buttonContainer}>
            <OpacityButton
              label="Criar Conta"
              disabled={false}
              styleDisabled={{ opacity: 0.5 }}
              onPress={handleContinue}
            />
          </View>
        </View>
      )}

      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexGrow: 1,
  },
  progressContainer: {
    marginTop: 15,
    justifyContent: "center",
    flexDirection: "row",
    gap: 25,
  },
  inputContainer: {
    margin: 25,
    gap: 22,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 15,
  },
  buttonContainer2: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: "40%",
  },
  button: {
    color: "#D2D2D2",
  },
});
