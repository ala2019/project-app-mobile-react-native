import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données depuis l'API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // Remplacez avec votre propre API
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
        setLoading(false);
      });
  }, []);

  // Fonction pour afficher chaque article
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alert(`Article: ${item.title}`)}
    >
      <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardBody}>
          {item.body.length > 60
            ? `${item.body.substring(0, 60)}...`
            : item.body}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Articles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardBody: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
