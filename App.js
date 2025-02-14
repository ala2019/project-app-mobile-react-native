import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Article from "./screens/Article";
import StartPage from "./screens/StartPage";
import Camera from "./screens/camera";

import Login from "./screens/Login";
import Register from "./screens/Register";

import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  const { logout, logedIn } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Acceuil") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Article") {
            iconName = focused ? "cube" : "cube-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Deconnexion") {
            iconName = focused ? "settings" : "log-out-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Acceuil"
        component={Home}
        options={{ headerShown: false, headerTitle: null }}
      />
      <Tab.Screen
        name="Article"
        component={Article}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Deconnexion"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            navigation.navigate("Login");
          },
        })}
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  const [isStartPage, setIsStartPage] = useState(true); // Control initial screen
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="StartPage">
          <Drawer.Screen name="StartPage" options={{ headerShown: false }}>
            {(props) => <StartPage {...props} />}
          </Drawer.Screen>

          <Drawer.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
