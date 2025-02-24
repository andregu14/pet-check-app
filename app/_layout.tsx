import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    MaterialSymbols: require("@/assets/fonts/MaterialSymbolsOutlined-Regular.ttf"),
    MaterialSymbolsFilled: require("@/assets/fonts/MaterialSymbolsOutlined_Filled-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="esqueci-senha"
          options={{
            title: "ESQUECI MINHA SENHA",
            headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="criar-conta"
          options={{
            title: "CRIAR CONTA",
            headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="changePassword"
          options={{
            title: "ALTERAR SENHA",
            headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
            headerShown: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
