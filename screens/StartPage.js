import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function StartPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue à l'application !</Text>
      <Text style={styles.subtitle}>Naviguez vers différentes sections :</Text>

      <View style={styles.menuContainer}>
        {/* Navigate to Register Screen */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Register")}
        >
          <Ionicons name="person-add-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Inscription</Text>
        </TouchableOpacity>

        {/* Navigate to Login Screen */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-in-outline" size={30} color="#4CAF50" />
          <Text style={styles.cardText}>Connexion</Text>
        </TouchableOpacity>
      </View>

      {/* Button to start the main content */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.startButtonText}>Commencer</Text>
      </TouchableOpacity>
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
