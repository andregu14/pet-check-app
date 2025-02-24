import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PetCard from "@/components/PetCard/PetCard";

const backgroundImage = require("@/assets/images/bg.jpg");

export default function Home() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="repeat"
      imageStyle={{opacity: 0.8}}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <PetCard />
          <PetCard />
          <PetCard />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    gap: 40,
    marginVertical: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
  }
});
