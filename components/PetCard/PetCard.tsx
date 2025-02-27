import { View, StyleSheet, Image, Text } from "react-native";

type PetCardProps = {
  name: string
  raca: string
  image?: string | undefined
  description: string | undefined
}

export default function PetCard(props: PetCardProps) {
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <Image style={styles.imageContainer} source={{ uri: props.image }}/>
            <Text style={styles.txtName}>{props.name}</Text>
            <Text>{props.raca}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.txtContainer}>
            <Text style={{fontSize: 12}}>{props.description}</Text>
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
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    width: "85%",
    backgroundColor: "#D9D9D9",
    marginVertical: 20,
  }
});
