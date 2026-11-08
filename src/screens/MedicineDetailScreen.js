import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// Trỏ vào file storage chứa AsyncStorage
import { getMedById, deleteMed } from "../data/db";

export default function MedicineDetailScreen({ route, navigation }) {
  const { medId } = route.params;
  const [med, setMed] = useState(null);

  // Xử lý lấy chi tiết bất đồng bộ
  const loadMed = async () => {
    try {
      const data = await getMedById(medId);
      setMed(data);
    } catch (error) {
      console.log("Error loading product detail:", error);
      setMed(null);
    }
  };

  //   // Xử lý xóa bất đồng bộ
  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this medicine?", [
      { text: "CANCEL", style: "cancel" },
      {
        text: "DELETE",
        style: "destructive",
        onPress: async () => {
          try {
            const success = await deleteMed(medId);
            if (success) {
              Alert.alert("Success", "Medicine deleted successfully!", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert("Error", "Failed to delete medicine");
            }
          } catch (error) {
            console.log("Error deleting medicine:", error);
            Alert.alert("Error", "An unexpected error occurred");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadMed();
    const unsubscribe = navigation.addListener("focus", () => {
      loadMed();
    });
    return unsubscribe;
  }, [navigation, medId]);

  if (!med) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Medicine not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{med.medicine_name}</Text>
        <Text style={styles.info}>
          Category : <Text style={styles.value}>{med.category}</Text>
        </Text>
        <Text style={styles.info}>
          Quantity : <Text style={styles.value}>{med.quantity}</Text>
        </Text>
        <Text style={styles.info}>
          Date : <Text style={styles.value}>{med.expiry_date}</Text>
        </Text>
        <Text style={styles.info}>
          Status : <Text style={styles.value}>{med.status}</Text>
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, styles.editBtn]}
            onPress={() =>
              navigation.navigate("MedEdit", { medId: med.id, med })
            }
          >
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.deleteBtn]}
            onPress={handleDelete}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  info: {
    fontSize: 15,
    color: "#666",
    marginBottom: 6,
  },
  value: {
    fontWeight: "bold",
    color: "#222",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#2979FF",
  },
  deleteBtn: {
    backgroundColor: "#EF5350",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 40,
    textAlign: "center",
    color: "#999",
  },
});
