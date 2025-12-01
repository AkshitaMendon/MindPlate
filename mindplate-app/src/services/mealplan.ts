// import api from "./api";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// export async function generateMealPlan(data: any) {
//   const token = await AsyncStorage.getItem("token");

//   return api.post("/generate_mealplan", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from "./api";

interface TokenPayload {
  user_id: number;
  exp: number;
}

// -------------------------
// GENERATE MEAL PLAN
// -------------------------
export async function generateMealPlan(data: any) {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.post("/generate_mealplan", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.meal_plan; // backend returns { meal_plan: {...} }
}


// -------------------------
// SAVE MEAL PLAN
// -------------------------
export async function saveMealPlan(meal_plan: any) {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const decoded = jwtDecode<TokenPayload>(token);
  const user_id = decoded.user_id;

  return api.post(
    "/mealplan/save",
    { user_id, meal_plan },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// -------------------------
// GET SAVED MEAL PLAN
// -------------------------
export async function getSavedMealPlan() {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;  // ⬅ IMPORTANT FIX

  const decoded = jwtDecode<TokenPayload>(token);
  const user_id = decoded.user_id;

  try {
    const response = await api.get(`/mealplan/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null; // no saved plan yet
    throw err;
  }
}
