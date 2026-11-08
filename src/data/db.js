import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@bill"; // lưu ý nếu có cái key khac thì đổi

// Dữ liệu mẫu ban đầu (nếu storage trống)
const INITIAL_PRODUCTS = [
  {
    id: 1,
    medicine_name: "Paracetamol 500mg",
    category: "Pain Relief",
    quantity: 20,
    expiry_date: "2027-03-15",
    status: "Available",
  },
  {
    id: 2,
    medicine_name: "Vitamin C 500mg",
    category: "Vitamins",
    quantity: 30,
    expiry_date: "2026-10-12",
    status: "Expiring Soon",
  },
  {
    id: 3,
    medicine_name: "First Aid Ointment",
    category: "First Aid",
    quantity: 5,
    expiry_date: "2026-09-30",
    status: "Expired",
  },
  {
    id: 4,
    medicine_name: "Medical Saline",
    category: "First Aid",
    quantity: 0,
    expiry_date: "2027-01-20",
    status: "Out of Stock",
  },
  {
    id: 5,
    medicine_name: "Ibuprofen 200mg",
    category: "Pain Relief",
    quantity: 15,
    expiry_date: "2026-10-09",
    status: "Expiring Soon",
  },
  {
    id: 6,
    medicine_name: "Multivitamin Tablets",
    category: "Vitamins",
    quantity: 60,
    expiry_date: "2027-06-30",
    status: "Available",
  },
  {
    id: 7,
    medicine_name: "Antiseptic Solution",
    category: "First Aid",
    quantity: 0,
    expiry_date: "2026-08-20",
    status: "Expired",
  },
  {
    id: 8,
    medicine_name: "Cetirizine 10mg",
    category: "Other",
    quantity: 12,
    expiry_date: "2026-10-16",
    status: "Expiring Soon",
  },
  {
    id: 9,
    medicine_name: "Cough Syrup",
    category: "Other",
    quantity: 2,
    expiry_date: "2026-10-17",
    status: "Available",
  },
  {
    id: 10,
    medicine_name: "Vitamin D3 1000 IU",
    category: "Vitamins",
    quantity: 0,
    expiry_date: "2026-12-31",
    status: "Out of Stock",
  },
];
// Khởi tạo dữ liệu mẫu nếu chưa có
export const initStorage = async () => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
  } catch (error) {
    console.error("Init Storage error:", error);
  }
};

// Lấy tất cả sản phẩm
export const getAllMed = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

// Thêm sản phẩm mới
export const addMed = async (
  medicine_name,
  category,
  quantity,
  expiry_date,
  status,
) => {
  try {
    const meds = await getAllMed();
    const newMed = {
      id: Date.now().toString(),
      medicine_name,
      category,
      quantity: Number(quantity),
      expiry_date,
      status,
    };
    meds.unshift(newMed);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    return newMed.id;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Cập nhật sản phẩm
export const updateMed = async (
  id,
  medicine_name,
  category,
  quantity,
  expiry_date,
  status,
) => {
  try {
    let meds = await getAllMed();
    meds = meds.map((item) => {
      if (String(item.id) === String(id)) {
        return {
          ...item,
          medicine_name,
          category,
          quantity: Number(quantity),
          expiry_date,
          status,
        };
      }
      return item;
    });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    return false;
  }
};

// Lấy chi tiết sản phẩm theo ID (Bổ sung cho màn hình Detail)
export const getMedById = async (id) => {
  try {
    const meds = await getAllMed();
    return meds.find((item) => String(item.id) === String(id)) || null;
  } catch (error) {
    console.error("Error getting art by ID:", error);
    return null;
  }
};

// Xóa sản phẩm
export const deleteMed = async (id) => {
  try {
    let meds = await getAllMed();
    meds = meds.filter((item) => String(item.id) !== String(id));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    return true;
  } catch (error) {
    console.error("Error deleting med:", error);
    return false;
  }
};
