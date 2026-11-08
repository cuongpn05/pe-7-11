import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MedicineItem({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.productHeader}>
        <Text style={styles.productTitle}>{item.medicine_name}</Text>
      </View>

      <Text style={styles.fieldLabel}>
        Category : <Text style={styles.fieldValue}>{item.category}</Text>
      </Text>
      <Text style={styles.fieldLabel}>
        Quantity :<Text style={styles.fieldValue}>{item.quantity}</Text>
      </Text>
      <Text style={styles.fieldLabel}>
        Date :<Text style={styles.fieldValue}>{item.expiry_date}</Text>
      </Text>
      <Text style={styles.fieldLabel}>
        Status :<Text style={styles.fieldValue}>{item.status}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    flex: 1,
    marginRight: 8,
  },
  fieldLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  fieldValue: {
    color: "#222",
    fontWeight: "500",
  },
});
