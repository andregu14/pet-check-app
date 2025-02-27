import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import PetCard from "@/components/PetCard/PetCard";
import useOfflineStorage, { User } from "@/constants/useOfflineStorage";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";

const backgroundImage = require("@/assets/images/bg.jpg");

type HomeParams = {
  userID: string
}

export default function Home() {
  const params = useGlobalSearchParams<HomeParams>()
  const userID = params.userID
  const [user, setUser] = useState<User | null>(null)
  
  const {
    getUserById,
    isLoading,
    error,
  } = useOfflineStorage();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserById(userID)
      setUser(userData)
    }
    loadUserData()
  }, [userID]) 

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="repeat"
      imageStyle={{opacity: 0.8}}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {user?.pets.map(pet => (
            <PetCard 
              key={pet.id}
              name={pet.name}
              raca={pet.raca}
              description={pet.description}
              image={pet.foto}
            />
          ))}
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
    marginTop: 80,
    marginBottom: 40,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center"
  },
  noPetsText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20
  }
 });
