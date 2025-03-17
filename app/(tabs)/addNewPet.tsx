import { HighlightButton } from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker.android";
import InputText from "@/components/InputText/InputText";
import PhotoPicker from "@/components/PhotoPicker/PhotoPicker";
import Select from "@/components/Select/Select";
import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGlobalSearchParams, useRouter } from "expo-router";
import useOfflineStorage, { Pet } from "@/constants/useOfflineStorage";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastMessage/ToastMessage";
import { Validators } from "@/constants/Validation";

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
  const [namePet, setNamePet] = useState<string>("");
  const [datePet, setDatePet] = useState<null | Date>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [raca, setRaca] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    namePet: "",
    tipo: "",
    raca: "",
    sexo: "",
    nascimentoPet: "",
    description: "",
  });
  const [formTouched, setFormTouched] = useState({
    namePet: false,
    tipo: false,
    raca: false,
    sexo: false,
    nascimentoPet: false,
    description: false,
  });

  const namePetRef = useRef<any>(null);
  const racaRef = useRef<any>(null);
  const descricaoRef = useRef<any>(null);

  const params = useGlobalSearchParams();
  const userID = params.userID;

  const router = useRouter();
  const { getUserById, saveUser } = useOfflineStorage();

  const resetForm = () => {
    setNamePet("");
    setSelectedTipo(null);
    setSelectedSexo(null);
    setDatePet(null);
    setSelectedImage(undefined);
    setRaca("");
    setDescription("");
  };

  // funcoes de validacao
  const validateField = (
    name: keyof typeof formErrors,
    value: string,
    customRequiredMessage?: string
  ) => {
    let error = "";

    // Verifica se o campo esta vazio
    const requiredError = Validators.required(value);
    if (requiredError) {
      error = customRequiredMessage || requiredError;
      setFormErrors((prev) => ({ ...prev, [name]: error }));
      return false;
    }

    // Se nao estiver vazio faz a validacao conforme o switch
    switch (name) {
      case "namePet":
        error = Validators.required(value);
        break;
      case "raca":
        error = Validators.required(value);
        break;
      case "description":
        error = Validators.required(value);
        break;
      case "nascimentoPet":
        error = Validators.date(value);
        break;
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  // Marca o campo como tocado e valida imediatamente
  const handleFieldBlur = (
    fieldName: keyof typeof formTouched,
    value: string
  ) => {
    setFormTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value);
  };

  const handleAddPet = async () => {
    const user = await getUserById(userID);

    namePetRef.current?.blur();
    racaRef.current?.blur();
    descricaoRef.current?.blur();

    const formFields = {
      namePet: true,
      tipo: true,
      raca: true,
      sexo: true,
      description: true,
      nascimentoPet: true,
    };

    setFormTouched((prev) => ({ ...prev, ...formFields }));

    // Revalida os campos
    const namePetValid = validateField(
      "namePet",
      namePet,
      "Digite o nome do seu pet"
    );
    const racaValid = validateField("raca", raca, "Digite a raça do seu pet");
    const descriptionValid = validateField(
      "description",
      description,
      "Digite uma descrição para o seu pet"
    );
    let nascimentoPetValid = true;
    if (datePet) {
      nascimentoPetValid = validateField(
        "nascimentoPet",
        datePet.toLocaleDateString("pt-BR"),
        "Data inválida"
      );
    } else {
      nascimentoPetValid = !formErrors.nascimentoPet;
    }

    const tipoValid = selectedTipo === null ? false : true;
    const sexoValid = selectedSexo === null ? false : true;

    if (!tipoValid)
      setFormErrors((prev) => ({
        ...prev,
        tipo: "Selecione o tipo do seu pet",
      }));
    if (!sexoValid)
      setFormErrors((prev) => ({
        ...prev,
        sexo: "Selecione o sexo do seu pet",
      }));

    // Verifica se TODOS os campos são válidos
    const allFieldsValid =
      namePetValid && racaValid && descriptionValid && tipoValid && sexoValid;

    if (!allFieldsValid) {
      Toast.show({
        type: "error",
        text1: "Dados Inválidos",
        text2: "Preencha todos os campos corretamente",
        visibilityTime: 4000,
      });
      return;
    }

    if (user) {
      const newPet: Pet = {
        id: uuid.v4(),
        name: namePet,
        tipo: selectedTipo,
        raca: raca,
        sexo: selectedSexo,
        nascimento: datePet?.toLocaleDateString() || null,
        description: description,
        foto: selectedImage,
      };

      const updateUser = {
        ...user,
        pets: [...user.pets, newPet],
      };

      try {
        await saveUser(updateUser);
        resetForm();
        const formFields = {
          namePet: false,
          tipo: false,
          raca: false,
          sexo: false,
          description: false,
          nascimentoPet: false,
        };

        setFormTouched((prev) => ({ ...prev, ...formFields }));
        setFormErrors((prev) => ({
          ...prev,
          description: "",
          namePet: "",
          nascimentoPet: "",
          raca: "",
          sexo: "",
          tipo: "",
        }));

        Toast.show({
          type: "success",
          text1: "Pet adicionado",
          text2: "Dados salvos com sucesso",
          visibilityTime: 4000,
        });
      } catch (e: any) {
        Toast.show({
          type: "error",
          text1: "Erro ao adicionar pet",
          text2: e.toString(),
          visibilityTime: 4000,
        });
      }
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Toast.show({
        type: "error",
        text1: "Selecione uma imagem",
        text2: "Por favor selecione uma imagem",
        visibilityTime: 4000,
      });
    }
  };

  return (
    <>
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
            refe={namePetRef}
            placeholder="Digite o nome do seu pet"
            obrigatorio={true}
            value={namePet}
            onChangeText={(text) => {
              setNamePet(text);
              if (formTouched.namePet) {
                validateField("namePet", text);
              }
            }}
            onBlur={() => handleFieldBlur("namePet", namePet)}
            useValidation={formTouched.namePet}
            isValid={formTouched.namePet ? !formErrors.namePet : null}
            errorMessage={formErrors.namePet}
          />
          <Select
            label="Tipo"
            obrigatorio={true}
            placeholder="Selecione o tipo do seu pet"
            data={tipo}
            onSelect={(item) => setSelectedTipo(item.value)}
            value={selectedTipo}
            errorTxt={formErrors.tipo}
          />
          <InputText
            label="Raça"
            refe={racaRef}
            placeholder="Digite a raça do seu pet"
            obrigatorio={true}
            inputMode="text"
            keyboardType="default"
            value={raca}
            onChangeText={(text) => {
              setRaca(text);
              if (formTouched.raca) {
                validateField("raca", text);
              }
            }}
            onBlur={() => handleFieldBlur("raca", raca)}
            useValidation={formTouched.raca}
            isValid={formTouched.raca ? !formErrors.raca : null}
            errorMessage={formErrors.raca}
          />
          <Select
            label="Sexo"
            obrigatorio={true}
            placeholder="Selecione o sexo do seu pet"
            data={sexo}
            onSelect={(item) => setSelectedSexo(item.value)}
            value={selectedSexo}
            errorTxt={formErrors.sexo}
          />
          <DatePicker
            key={datePet ? datePet.toString() : "empty"}
            label="Data de nascimento do seu pet"
            placeholder="dd/mm/aaaa"
            onChange={setDatePet}
            value={datePet}
            useValidation={false}
          />
          <InputText
            label="Descrição"
            refe={descricaoRef}
            placeholder="Digite uma breve descrição do seu pet"
            obrigatorio={true}
            inputMode="text"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (formTouched.description) {
                validateField("description", text);
              }
            }}
            onBlur={() => handleFieldBlur("description", description)}
            useValidation={formTouched.description}
            isValid={formTouched.description ? !formErrors.description : null}
            errorMessage={formErrors.description}
            keyboardType="default"
          />
          <View style={styles.buttonContainer}>
            <HighlightButton
              label="Adicionar"
              disabled={false}
              styleDisabled={{ opacity: 0.5 }}
              onPress={handleAddPet}
            />
          </View>
        </View>
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
