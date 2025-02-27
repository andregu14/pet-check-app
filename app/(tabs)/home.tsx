import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import PetCard from "@/components/PetCard/PetCard";
import useOfflineStorage, { User } from "@/constants/useOfflineStorage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";

const backgroundImage = require("@/assets/images/bg.jpg");

type HomeParams = {
  userID: string;
};

export default function Home() {
  const params = useGlobalSearchParams<HomeParams>();
  const userID = params.userID;
  const [user, setUser] = useState<User | null>(null);

  const { getUserById, isLoading, error } = useOfflineStorage();

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        const userData = await getUserById(userID);
        setUser(userData);
      };
      loadUserData();
    }, [userID])
  );

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserById(userID);
      setUser(userData);
    };
    loadUserData();
  }, [userID]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="repeat"
      imageStyle={{ opacity: 0.8 }}
    >
      <FlatList
        data={user?.pets}
        onRefresh={() => getUserById(userID)}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <PetCard
            key={item.id}
            name={item.name}
            raca={item.raca}
            description={item.description}
            image={item.foto}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.container, {paddingBottom: 40}]}
        style={styles.flatList}
        ListEmptyComponent={
          <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
        }
      />
      <StatusBar backgroundColor="#fff" style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    gap: 40,
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noPetsText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    textAlign: "center"
  },
  flatList: {
    flex: 1,
    width: "100%"
  }
});
