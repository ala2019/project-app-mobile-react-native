import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Importation du hook
import CameraScreen from "./camera";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation(); // Utilisation du hook pour accéder à la navigation
  const { authState } = useAuth();

  const [openCamera, setOpenCamera] = useState(false);

  const afterSaveEmage = (url) => {
    setProfileImage(url);
    setOpenCamera(false);

    return true;
  };

  const closeCamer = () => {
    setOpenCamera(false);
  };

  if (openCamera)
    return <CameraScreen afterSaveEmage={afterSaveEmage} close={closeCamer} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Photo</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setOpenCamera(true)} // Utilisation de navigation ici
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{authState?.email ?? "email"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#4CAF50",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeholder: {
    width: 140,
    height: 140,
    backgroundColor: "#ccc",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#4CAF50",
  },
  placeholderText: {
    color: "#555",
    fontSize: 20,
    fontWeight: "600",
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2c3e50",
  },
});
