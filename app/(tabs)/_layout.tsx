import React from "react";
import { router, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import MaterialSymbol from "@/components/MaterialSymbol/MaterialSymbol";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialSymbol
              name="home"
              filled={focused}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addNewPet"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialSymbol
              name="add"
              filled={focused}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "MEUS DADOS",
          headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15, marginRight: 30}}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialSymbol
              name="settings"
              filled={focused}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
