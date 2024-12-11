import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as Notifications from "expo-notifications";
import { useAuth } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();
  useEffect(() => {
    const requestNotificationPermission = async () => {
      // const { status } = await Notifications.getPermissionsAsync();
      // console.log(status);
      // if (status != "granted") {
      //   console.log("sss");

      await Notifications.requestPermissionsAsync();
      // }
    };
    requestNotificationPermission();
  }, []);
  const schedulePushNotification = async () => {
    console.log("inNotif");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Connexion réussie",
        body: "Vous êtes maintenant connecté à l'application.",
      },
      trigger: {
        repeats: false,
        seconds: 60,
      },
    });
    console.log("inNotissssssf");
  };
  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
    } else {
      // alert("Connexion réussie !");
      console.log("sdfsdfsdf");
      login(email, password);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Connexion réussie",
          body: "Vous êtes maintenant connecté à l'application.",
        },
        trigger: null,
      });

      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPres={() => navigation.navigate("Home")}
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 237,
    height: 202,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#4CAF50",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
