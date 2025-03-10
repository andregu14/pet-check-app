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
import useOfflineStorage from "@/constants/useOfflineStorage";
import { useRouter } from "expo-router";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import { Validators } from "@/constants/Validation";
import { toastConfig } from "@/components/ToastMessage/ToastMessage";

interface Pet {
  id: string;
  name: string;
  tipo: string | null;
  raca: string;
  sexo: string | null;
  nascimento: string | null;
  description: string;
  foto?: string;
}

interface User {
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

const genero = [
  { title: "Masculino", value: "Masculino" },
  { title: "Feminino", value: "Feminino" },
  { title: "Prefiro não informar", value: "Prefiro não informar" },
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
  const { saveUser, isLoading, error } = useOfflineStorage();
  const router = useRouter();
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
  const [password, setPassword] = useState("");
  const [raca, setRaca] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    cpf: "",
    email: "",
    celular: "",
    nascimento: "",
    password: "",
    confirmPassword: "",
    namePet: "",
    tipo: "",
    raca: "",
    sexo: "",
    nascimentoPet: "",
    description: "",
    genero: "",
  });
  const [formTouched, setFormTouched] = useState({
    name: false,
    cpf: false,
    email: false,
    celular: false,
    password: false,
    confirmPassword: false,
    namePet: false,
    tipo: false,
    raca: false,
    sexo: false,
    nascimento: false,
    nascimentoPet: false,
    description: false,
  });

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
      case "name":
        error = Validators.fullName(value);
        break;
      case "cpf":
        error = Validators.cpf(value);
        break;
      case "email":
        error = Validators.email(value);
        break;
      case "celular":
        error = Validators.phone(value);
        break;
      case "password":
        error = Validators.password(value);
        break;
      case "confirmPassword":
        error = password !== value ? "Senhas não coincidem" : "";
        break;
      case "namePet":
        error = Validators.required(value);
        break;
      case "raca":
        error = Validators.required(value);
        break;
      case "description":
        error = Validators.required(value);
        break;
      case "nascimento":
        error = Validators.date(value);
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

  const handleContinue = () => {
    // Marca todos os campos da primeira parte como touched
    const firstFormFields = {
      name: true,
      cpf: true,
      email: true,
      celular: true,
      password: true,
      confirmPassword: true,
      nascimento: true,
    };

    setFormTouched((prev) => ({ ...prev, ...firstFormFields }));

    // Revalida todos os campos obrigatorios da primeira parte
    const nameValid = validateField("name", name, "Digite o seu nome completo");
    const cpfValid = validateField("cpf", cpf, "Digite o seu cpf");
    const emailValid = validateField("email", email, "Digite o seu email");
    const celularValid = validateField(
      "celular",
      celular,
      "Digite o seu número de celular"
    );
    const passwordValid = validateField(
      "password",
      password,
      "Digite a sua senha"
    );
    const confirmPasswordValid = validateField(
      "confirmPassword",
      confirmPassword,
      "As senhas não coincidem"
    );
    let nascimentoValid = true;
    // Se date não for nulo, validamos a data
    if (date) {
      nascimentoValid = validateField(
        "nascimento",
        date.toLocaleDateString("pt-BR"),
        "Data inválida"
      );
    } else {
      // Se estiver vazio, verificamos se há algum erro (talvez de uma validação anterior)
      nascimentoValid = !formErrors.nascimento;
    }
    const generoValid = selectedGenero === null ? false : true;

    if (!generoValid)
      setFormErrors((prev) => ({ ...prev, genero: "Selecione o seu gênero" }));

    // Verifica se TODOS os campos são válidos
    const allFieldsValid =
      nameValid &&
      cpfValid &&
      emailValid &&
      celularValid &&
      passwordValid &&
      confirmPasswordValid &&
      nascimentoValid &&
      generoValid;

    if (!allFieldsValid) {
      Toast.show({
        type: "error",
        text1: "Dados Inválidos",
        text2: "Preencha todos os campos corretamente",
        visibilityTime: 4000,
      });
      return;
    }

    setShowSecondForm(true);
  };

  const handleCreateAccount = async () => {
    // Marca todos os campos da segunda parte como touched

    const secondFormFields = {
      namePet: true,
      tipo: true,
      raca: true,
      sexo: true,
      description: true,
      nascimentoPet: true,
    };

    setFormTouched((prev) => ({ ...prev, ...secondFormFields }));

    // Revalida os campos da segunda parte
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

    const newUser: User = {
      id: uuid.v4(), // Gera ID unico
      name,
      cpf,
      email,
      celular,
      genero: selectedGenero,
      nascimento: date?.toLocaleDateString() || null,
      password,
      pets: [
        {
          id: uuid.v4(),
          name: namePet,
          tipo: selectedTipo,
          raca: raca,
          sexo: selectedSexo,
          nascimento: datePet?.toLocaleDateString() || null,
          description: description,
          foto: selectedImage,
        },
      ],
    };

    try {
      await saveUser(newUser);
      // Redirecionar
      router.replace({ pathname: "/home", params: { userID: newUser.id } });
      setShowSecondForm(false);
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar conta",
        text2: e.toString(),
        visibilityTime: 4000,
      });
    }
  };

  // mantem a data atual se o campo for parciamente apagado
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate); // mantem o valor anterior se newDate for null
  };

  const handleDatePetChange = (newDate: Date | null) => {
    setDatePet(newDate);
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
      alert("Selecione uma imagem");
    }
  };

  return (
    <>
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
              onChangeText={(text) => {
                setName(text);
                if (formTouched.name) {
                  validateField("name", text);
                }
              }}
              onBlur={() => handleFieldBlur("name", name)}
              useValidation={formTouched.name}
              isValid={formTouched.name ? !formErrors.name : null}
              errorMessage={formErrors.name}
            />
            <InputText
              label="CPF"
              placeholder="000.000.000-00"
              obrigatorio={true}
              keyboardType="number-pad"
              value={cpf}
              onChangeText={(text) => {
                const formatted = formatCPF(text);
                setCpf(formatted);
                if (formTouched.cpf) {
                  validateField("cpf", formatted.replace(/\D/g, ""));
                }
              }}
              onBlur={() => handleFieldBlur("cpf", cpf)}
              maxLength={14}
              useValidation={formTouched.cpf}
              isValid={formTouched.cpf ? !formErrors.cpf : null}
              errorMessage={formErrors.cpf}
            />
            <InputText
              label="E-mail"
              placeholder="Digite o seu e-mail"
              obrigatorio={true}
              inputMode="email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (formTouched.email) {
                  validateField("email", text);
                }
              }}
              onBlur={() => handleFieldBlur("email", email)}
              useValidation={formTouched.email}
              isValid={formTouched.email ? !formErrors.email : null}
              errorMessage={formErrors.email}
            />
            <InputText
              label="DDD + Celular"
              placeholder="(00) 00000 0000"
              obrigatorio={true}
              inputMode="tel"
              value={celular}
              onChangeText={(text) => {
                const formatted = formatPhoneNumber(text);
                setCelular(formatted);
                if (formTouched.celular) {
                  validateField("celular", formatted.replace(/\D/g, ""));
                }
              }}
              maxLength={15}
              onBlur={() => handleFieldBlur("celular", celular)}
              useValidation={formTouched.celular}
              isValid={formTouched.celular ? !formErrors.celular : null}
              errorMessage={formErrors.celular}
            />
            <Select
              data={genero}
              label="Gênero"
              placeholder="Selecione o seu gênero"
              obrigatorio={true}
              onSelect={(item) => setSelectedGenero(item.value)}
              value={selectedGenero}
              errorTxt={formErrors.genero}
            />
            <DatePicker
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              onChange={(newDate) => {
                handleDateChange(newDate);
                validateField(
                  "nascimento",
                  newDate?.toLocaleDateString("pt-BR") || ""
                );
              }}
              value={date}
              errorMessage={formErrors.nascimento}
              isValid={formTouched.nascimento ? !formErrors.nascimento : null}
              useValidation={formTouched.nascimento}
            />
            <InputText
              label="Senha"
              placeholder="Digite a sua senha"
              obrigatorio={true}
              password={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (formTouched.password) {
                  validateField("password", text);
                }
              }}
              autoCapitalize="none"
              onBlur={() => handleFieldBlur("password", password)}
              useValidation={formTouched.password}
              isValid={formTouched.password ? !formErrors.password : null}
              errorMessage={formErrors.password}
            />
            <InputText
              label="Confirmar Senha"
              placeholder="Confirme a sua senha"
              obrigatorio={true}
              password={true}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (formTouched.confirmPassword) {
                  validateField("confirmPassword", text);
                }
              }}
              onBlur={() => handleFieldBlur("confirmPassword", confirmPassword)}
              useValidation={formTouched.confirmPassword}
              isValid={
                formTouched.confirmPassword ? !formErrors.confirmPassword : null
              }
              errorMessage={formErrors.confirmPassword}
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
              label="Data de nascimento do seu pet"
              placeholder="dd/mm/aaaa"
              onChange={(newDate) => {
                handleDatePetChange(newDate);
                validateField(
                  "nascimentoPet",
                  newDate?.toLocaleDateString("pt-BR") || ""
                );
              }}
              value={datePet}
              errorMessage={formErrors.nascimentoPet}
              isValid={
                formTouched.nascimentoPet ? !formErrors.nascimentoPet : null
              }
              useValidation={formTouched.nascimentoPet}
            />
            <InputText
              label="Descrição"
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
              <OpacityButton
                label="Criar Conta"
                disabled={isLoading}
                styleDisabled={{ opacity: 0.5 }}
                onPress={handleCreateAccount}
              />
              {error && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {error}
                </Text>
              )}
            </View>
          </View>
        )}

        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
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
