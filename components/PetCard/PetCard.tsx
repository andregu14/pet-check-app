import { View, StyleSheet, Image, Text } from "react-native";

export default function PetCard() {
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <Image style={styles.imageContainer}/>
            <Text style={styles.txtName}>Nome do Pet</Text>
            <Text>Raça</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.txtContainer}>
            <Text></Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 350,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D9D9D9",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  imageContainer: {
    height: 130,
    width: 130,
    borderRadius: 65,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  txtName: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 7
  },
  txtContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#D9D9D9",
    marginVertical: 20,
  }
});
