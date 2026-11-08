import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { initStorage } from "./src/data/db";
import MedicineListScreen from "./src/screens/MedicineListScreen";
import MedicineAddScreen from "./src/screens/MedicineAddScreen";
import MedicineDetailScreen from "./src/screens/MedicineDetailScreen";
import MedicineEditScreen from "./src/screens/MedicineEditScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedList" component={MedicineListScreen} />
      <Stack.Screen name="MedDetail" component={MedicineDetailScreen} />
      <Stack.Screen name="MedEdit" component={MedicineEditScreen} />
      <Stack.Screen name="MedAdd" component={MedicineAddScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    // Khởi tạo dữ liệu mẫu với AsyncStorage bất đồng bộ
    const setupData = async () => {
      try {
        await initStorage();
      } catch (error) {
        console.log("Error initializing storage:", error);
      }
    };

    setupData();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2979FF",
          tabBarInactiveTintColor: "#888",
        }}
      >
        <Tab.Screen
          name="Home"
          component={GalleryStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="images" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
