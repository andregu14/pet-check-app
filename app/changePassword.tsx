import { HighlightButton } from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import { View, StyleSheet } from "react-native";

export default function changePassword() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <InputText
          label="Senha"
          placeholder="Digite sua senha atual"
          password={true}
          autoCapitalize="none"
          obrigatorio={true}
        />
        <InputText
          label="Senha"
          placeholder="Digite a sua nova senha"
          password={true}
          autoCapitalize="none"
          obrigatorio={true}
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
          onPress={() => {}}
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
    marginTop: "45%"
  }
});
