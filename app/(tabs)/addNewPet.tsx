import { HighlightButton, OpacityButton } from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker.android";
import InputText from "@/components/InputText/InputText";
import PhotoPicker from "@/components/PhotoPicker/PhotoPicker";
import Select from "@/components/Select/Select";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

const tipo = [
  { title: "Gato", value: "gato" },
  { title: "Cachorro", value: "cachorro" },
];

const sexo = [
  { title: "Macho", value: "M" },
  { title: "Fêmea", value: "F" },
];

export default function addNewPet() {
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [namePet, setNamePet] = useState("");
  const [datePet, setDatePet] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

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
        <View style={styles.buttonContainer}>
          <HighlightButton
            label="Adicionar"
            disabled={false}
            styleDisabled={{ opacity: 0.5 }}
            onPress={() => {}}
          />
        </View>
      </View>
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
    marginTop: 70,
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
