import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 12,
    margin: 5,
    backgroundColor: "rgba(23, 99, 153, 0.9)",
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: "rgb(23, 99, 153)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  // HighlightButton Alt Style
  buttonTextAlt: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonAlt: {
    alignItems: "center",
    padding: 12,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  }
});

export default styles;
