import { View, Text, StyleSheet, Image } from "react-native";

const cat = require("@/assets/images/cat.png");
const dog = require("@/assets/images/dog.png");

type ListHeaderProps = {
  title: string;
  image: "cat" | "dog";
  backgroundColor?: string;
  textColor?: string;
};

export default function ListHeader({
  title,
  image,
  backgroundColor = "#176299",
  textColor = "#fff",
}: ListHeaderProps) {
  const img = image === "cat" ? cat : image === "dog" ? dog : undefined;

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }, styles.shadow]}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.titleTxt,
            { color: textColor, fontFamily: "SourceSerifPro_900Black" },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          style={[
            image === "cat" && styles.imageContainerCat,
            image === "dog" && styles.imageContainerDog,
          ]}
          source={img}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
    flexDirection: "row",
    borderWidth: 0.3,
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingRight: 60, // Espaço para a imagem
  },
  titleTxt: {
    textAlign: "left",
    fontSize: 24,
    letterSpacing: 1.5,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  imageWrapper: {
    position: "absolute",
    right: 10,
    bottom: 0,
    zIndex: 1,
  },
  imageContainerCat: {
    height: 90,
    width: 62,
    bottom: -39,
  },
  imageContainerDog: {
    height: 65,
    width: 90,
    bottom: 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4
  }
});
