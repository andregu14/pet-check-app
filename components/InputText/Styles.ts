import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingRight: 10,
    height: 45,
    fontSize: 14,
    marginLeft: 10,
    borderRadius: 10,
  },
  textInputLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  textInputContainer: {
    alignSelf: "stretch",
  },
  textInputInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D9D9D9",
  },
  textInputInnerContainerFocused: {
    borderColor: "#176299",
    borderWidth: 2.7,
  },
  textLabelContainer: {
    flexDirection: "row",
  },
  textLabelObrigatorio: {
    marginTop: 4,
    marginLeft: 6,
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 10,
  },
  textInputInnerContainerError: {
    borderColor: "red",
    borderWidth: 1.5,
  },
  textInputInnerContainerValid: {
    borderColor: "green",
    borderWidth: 1.5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  }
});

export default styles;
