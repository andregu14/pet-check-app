import {
  ImageBackground,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import PetCard from "@/components/PetCard/PetCard";
import useOfflineStorage, { User } from "@/constants/useOfflineStorage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastMessage/ToastMessage";
import ListHeader from "@/components/ListHeader/ListHeader";
const backgroundImage = require("@/assets/images/bg.jpg");

type HomeParams = {
  userID: string;
};

const calcIdade = (dataNascimento: string): number => {
  const partes = dataNascimento.split("/");
  const diaNasc = parseInt(partes[0]);
  const mesNasc = parseInt(partes[1]) - 1;
  const anoNasc = parseInt(partes[2]);

  const dataNasc = new Date(anoNasc, mesNasc, diaNasc);
  const hoje = new Date();

  let idade = hoje.getFullYear() - dataNasc.getFullYear();

  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  if (
    mesAtual < dataNasc.getMonth() ||
    (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())
  ) {
    idade--;
  }

  return idade;
};

export default function Home() {
  const params = useGlobalSearchParams<HomeParams>();
  const userID = params.userID;
  const [user, setUser] = useState<User | null>(null);

  const { getUserById, isLoading, error } = useOfflineStorage();

  const cats = user?.pets.filter((pet) => pet.tipo === "gato") || [];
  const dogs = user?.pets.filter((pet) => pet.tipo === "cachorro") || [];

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
    return Toast.show({
      type: "error",
      text1: "Erro ao criar conta",
      text2: error.toString(),
      visibilityTime: 3000,
    });
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="repeat"
      imageStyle={{ opacity: 0.8 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Gatos */}
        <FlatList
          data={cats}
          scrollEnabled={false}
          ListHeaderComponent={<ListHeader image="cat" title="GATOS"/>}
          ListHeaderComponentStyle={{ width: "100%", paddingTop: Platform.OS === 'android' ? 10 : 0 }}
          renderItem={({ item }) => (
            <PetCard
              key={item.id}
              name={item.name}
              raca={item.raca}
              description={item.description}
              image={item.foto}
              idade={item.nascimento ? calcIdade(item.nascimento) : undefined }
              sexo={item.sexo ? item.sexo : undefined}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
          }
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
        />
        {/* Cachorros */}
        <FlatList
          data={dogs}
          scrollEnabled={false}
          ListHeaderComponent={<ListHeader image="dog" title="CACHORROS" />}
          ListHeaderComponentStyle={{ width: "100%" }}
          renderItem={({ item }) => (
            <PetCard
              key={item.id}
              name={item.name}
              raca={item.raca}
              description={item.description}
              image={item.foto}
              idade={item.nascimento ? calcIdade(item.nascimento) : undefined }
              sexo={item.sexo ? item.sexo : undefined}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContainer, { paddingTop: 60 }]}
          ListEmptyComponent={
            <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
          }
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
        />
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="auto" />
      <Toast config={toastConfig} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  listContainer: {
    gap: 50,
    paddingTop: 33,
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 40,
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
    textAlign: "center",
    paddingVertical: 100,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
});
