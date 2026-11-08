import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";

import { getAllMed } from "../data/db";
import MedicineItem from "../components/MedicineItem";
import { Ionicons } from "@expo/vector-icons";

export default function ListProductScreen({ navigation }) {
  const [meds, setMeds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load tất cả artworks
  const loadMed = useCallback(async () => {
    try {
      const data = await getAllMed();
      setMeds(data);
    } catch (error) {
      console.log("Lỗi tải artworks:", error);
      setMeds([]);
    }
  }, []);

  useEffect(() => {
    loadMed();

    const unsubscribe = navigation.addListener("focus", () => {
      loadMed();
    });

    return unsubscribe;
  }, [navigation, loadMed]);

  // Refresh danh sách
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    await loadMed();

    setRefreshing(false);
  }, [loadMed]);

  return (
    <View style={styles.container}>
      {/* Banner ảnh Album Tracker */}
      <Image
        source={require("../../assets/banner.png")} // Đổi tên file phù hợp với ảnh trong thư mục assets
        style={styles.bannerImage}
        resizeMode="cover"
      />

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicineItem
            item={item}
            onPress={() =>
              navigation.navigate("MedDetail", {
                medId: item.id,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />

      {/* 5. ADD BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("MedAdd")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  bannerImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#e0e0e0",
  },

  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  resetButtonText: {
    fontSize: 13,
    color: "#2979FF",
    fontWeight: "600",
    marginLeft: 5,
  },

  dropdownWrapper: {
    marginHorizontal: 16,
    marginTop: 10,
    zIndex: 100,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  dropdownButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  dropdownList: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    zIndex: 1000,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  dropdownItemActive: {
    backgroundColor: "#E3F2FD",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },

  dropdownItemTextActive: {
    color: "#2979FF",
    fontWeight: "bold",
  },

  favoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  favoriteLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  favoriteText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 44,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 8,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 90,
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2979FF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    gap: 6,
  },

  sortBtn: {
    flex: 1,
    backgroundColor: "#E8F0FE",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
