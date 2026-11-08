import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
// Đổi đường dẫn sang storage nếu dùng AsyncStorage, hoặc giữ db nếu dùng SQLite
import { addMed } from "../data/db";

export default function MedicineAddScreen({ route, navigation }) {
  const [medName, setName] = useState("");
  const [medCategory, setCategory] = useState("");
  const [medQuantity, setQuantity] = useState("");
  const [medDate, setDate] = useState("");
  const [medStatus, setStatus] = useState("");

  const handleSave = async () => {
    // 1. Kiểm tra validation
    if (!medName.trim()) {
      Alert.alert("Error", "Please enter medicine name");
      return;
    }
    if (!medCategory.trim()) {
      Alert.alert("Error", "Please enter category");
      return;
    }
    if (!medQuantity.trim() || isNaN(Number(medQuantity))) {
      Alert.alert("Error", "Please enter quantity");
      return;
    }
    if (!medStatus.trim()) {
      Alert.alert("Error", "Please enter Status");
      return;
    }

    if (!medDate.trim()) {
      Alert.alert("Error", "Please enter Date");
      return;
    }

    try {
      // 2. Gọi thêm mới với đúng thứ tự tham số
      const result = await addMed(
        medName.trim(),
        medCategory.trim(),
        Number(medQuantity.trim()),
        medDate.trim(),
        medStatus.trim(),
      );

      if (result) {
        Alert.alert("Success", "Medicine added successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", "Failed to add medicine");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Medicine Name</Text>
        <TextInput
          style={styles.input}
          value={medName}
          onChangeText={setName}
          placeholder="Enter Medicine name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={medCategory}
          onChangeText={setCategory}
          placeholder="Enter Category"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={medQuantity}
          onChangeText={setQuantity}
          placeholder="Enter Quantity"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={String(medDate)}
          onChangeText={setDate}
          placeholder="Enter Date"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={medStatus}
          onChangeText={setStatus}
          placeholder="Enter Status"
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
    color: "#111",
  },
  saveBtn: {
    backgroundColor: "#2979FF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
