import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigation = useNavigation();
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    const schedulePushNotification = async () => {
      console.log("inNotif");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "This is a test notification.",
        },
        trigger: {
          seconds: 1,
        },
      });
      console.log("inNotissssssf");
    };
    schedulePushNotification();
    requestNotificationPermission();
  }, []);

  const logout = async () => {
    if (Platform.OS === "android") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Déconnexion réussie",
          body: "Vous êtes maintenant connecté à l'application.",
        },
        trigger: null, // Send immediately
      });
    }

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue à l'accueil !</Text>
      <Text style={styles.subtitle}>Naviguez vers différentes sections :</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Article")}
        >
          <Ionicons name="document-text-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>List Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Paramètres</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#e74c3c" }]} // Optional: change background color to indicate logout
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={30} color="#fff" />
          <Text style={[styles.cardText, { color: "#fff" }]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
