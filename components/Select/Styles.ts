import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    selectContainer: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#D9D9D9",
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 8,
    },
    obrigatorio: {
      color: "rgba(0, 0, 0, 0.5)",
      fontSize: 10,
      fontWeight: "normal",
      marginTop: 4,
      marginLeft: 3,
    },
    buttonStyle: {
      width: "100%",
      height: 48,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#D9D9D9",
      borderRadius: 10,
    },
    dropdownButtonStyle: {
      width: "100%",
      height: 48,
      backgroundColor: "white",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 14,
      color: "#000000",
    },
    placeholder: {
      color: "#999999",
    },
    dropdownMenuStyle: {
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#D9D9D9",
      marginTop: -35,
    },
    dropdownItemStyle: {
      width: "100%",
      height: 48,
      paddingHorizontal: 12,
      justifyContent: "center",
    },
    selectedItem: {
      backgroundColor: "#F5F5F5",
    },
    dropdownItemTxtStyle: {
      fontSize: 14,
      color: "#000000",
    },
    textLabelContainer: {
      flexDirection: "row",
    },
  });

  export default styles
  