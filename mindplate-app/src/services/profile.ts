import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

interface TokenPayload {
  user_id: number;
  exp: number;
}

async function getUserIdFromToken() {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const decoded = jwtDecode<TokenPayload>(token);
  return decoded.user_id;
}

export async function getProfile() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;

    const response = await api.get("/profile/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const p=response.data
  

    return {
      age: p.age,
      gender: p.gender,
      height: p.height,
      weight: p.weight,
      bmi: p.bmi,
      bmiCategory: p.bmi_category,
      mentalHealthCondition: p.mental_health_focus,
      origin: p.origin,                
      residence: p.residence, 
    };

  } catch (err) {
    return null;
  }
}

export async function createProfile(data: any) {
  const token = await AsyncStorage.getItem("token");
  return api.post("/profile/create", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateProfile(data:any) {
  const token = await AsyncStorage.getItem("token");
  return api.put("/profile/update", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
