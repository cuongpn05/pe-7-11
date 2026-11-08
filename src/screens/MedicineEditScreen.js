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
import { updateMed } from "../data/db";

export default function MedicineEditScreen({ route, navigation }) {
  const { medId, med } = route.params;
  const [medName, setName] = useState(med?.medicine_name || "");
  const [medCategory, setCategory] = useState(med?.category || "");
  const [medQuantity, setQuantity] = useState(med?.quantity || "");
  const [medDate, setDate] = useState(med?.expiry_date || "");
  const [medStatus, setStatus] = useState(med?.status || "");

  const handleUpdate = async () => {
    // 1. Kiểm tra validation
    if (!medName.trim()) {
      Alert.alert("Error", "Please enter medicine name");
      return;
    }
    if (!medCategory.trim()) {
      Alert.alert("Error", "Please enter category");
      return;
    }
    if (!medQuantity.trim()) {
      Alert.alert("Error", "Please enter quantity");
      return;
    }

    if (!medDate.trim()) {
      Alert.alert("Error", "Please enter status");
      return;
    }
    if (!medStatus.trim()) {
      Alert.alert("Error", "Please enter date");
      return;
    }

    try {
      // 2. Gọi thêm mới với đúng thứ tự tham số
      const success = await updateMed(
        medId,
        medName.trim(),
        medCategory.trim(),
        Number(medQuantity.trim()),
        medDate.trim(),
        medStatus.trim(),
      );

      if (success) {
        Alert.alert("Success", "Product added successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", "Failed to add product");
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
          placeholder="Enter med name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={medCategory}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={String(medQuantity)}
          onChangeText={setQuantity}
          placeholder="Enter quantity"
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

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
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
