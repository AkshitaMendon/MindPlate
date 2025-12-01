import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// LOGIN
export const loginUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  await AsyncStorage.setItem("token", res.data.access_token);
  return res.data;
};

// SIGNUP
export const signupUser = async (data: any) => {
  const res = await api.post("/auth/signup", data);
  await AsyncStorage.setItem("token", res.data.access_token);
  return res.data;
};

// Forgot Password Request
export const requestPasswordReset = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};


// Verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};


// Reset Password
export const resetPassword = async (email: string, new_password: string) => {
  const res = await api.post("/auth/reset-password", {
    email,
    new_password,
  });
  return res.data;
};



