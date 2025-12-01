// "use client"

// import { useState } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native"
// import type { AuthNavigationProps } from "./index"

// interface Props {
//   navigation: AuthNavigationProps
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   content: {
//     alignItems: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 10,
//   },
//   form: {
//     width: "100%",
//     maxWidth: 300,
//   },
//   errorContainer: {
//     backgroundColor: "#ffcccc",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   errorText: {
//     color: "#ff0000",
//     fontSize: 14,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     borderRadius: 5,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonDisabled: {
//     backgroundColor: "#cccccc",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   footerText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   footerLink: {
//     fontSize: 14,
//     color: "#007bff",
//     marginLeft: 5,
//   },
// })

// export default function LoginScreen({ navigation }: Props) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleLogin = async () => {
//     setError("")

//     if (!email || !password) {
//       setError("Please fill in all fields")
//       return
//     }

//     if (!email.includes("@")) {
//       setError("Please enter a valid email")
//       return
//     }

//     setLoading(true)

//     try {
//       // TODO: Implement your authentication logic here
//       await new Promise((resolve) => setTimeout(resolve, 1500))
//       console.log("Login successful", { email })

//       if (navigation.onLoginSuccess) {
//         navigation.onLoginSuccess()
//       }
//     } catch (err) {
//       setError("Login failed. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
//         <View style={styles.content}>
//           <View style={styles.header}>
//             <Text style={styles.logo}>MindPlate</Text>
//             <Text style={styles.subtitle}>Welcome back! Please login to continue</Text>
//           </View>

//           <View style={styles.form}>
//             {error ? (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             ) : null}

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#999"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoComplete="email"
//                 editable={!loading}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#999"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//                 autoComplete="password"
//                 editable={!loading}
//               />
//             </View>

//             <TouchableOpacity
//               style={[styles.button, loading && styles.buttonDisabled]}
//               onPress={handleLogin}
//               disabled={loading}
//             >
//               {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
//             </TouchableOpacity>
//           </View>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate("signup")}>
//               <Text style={styles.footerLink}>Sign up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   )
// }


"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { loginUser } from "../../services/auth";   // API CALL
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import {getProfile} from "../../services/profile";


type Props = {
  // onLoginSuccess: (data: { has_profile: boolean }) => void;
  // goToSignup: () => void;
  onLoginSuccess: (data: { has_profile: boolean, name: string, email: string }) => void;
  goToSignup: () => void;
  goToForgot: ()=>void;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
  content: { alignItems: "center" },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 10 },

  form: { width: "100%", maxWidth: 300 },

  errorContainer: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: { color: "#ff0000", fontSize: 14 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { backgroundColor: "#cccccc" },
  buttonText: { color: "#fff", fontSize: 16 },

  footer: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#666" },
  footerLink: { fontSize: 14, color: "#007bff", marginLeft: 5 },
});

export default function LoginScreen({ onLoginSuccess, goToSignup, goToForgot }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });
      console.log("Login Success:", res);
      // Save JWT
      await AsyncStorage.setItem("token", res.access_token);

      // Decode token → extract user_id
      // const decoded: any = jwtDecode(res.access_token);
      // const userId = decoded.user_id;

      // Fetch profile to check if it exists
      // const profile = await getProfile(userId);
      const profile = await getProfile();

      onLoginSuccess({
        has_profile: res.has_profile,
        name: res.name,
        email: res.email
      });

      // NEW: Expecting JWT
      // if (res?.access_token) {
      //   await AsyncStorage.setItem("token", res.access_token);
      //   onLoginSuccess({ has_profile: res.has_profile });
      // } else {
      //   setError("Invalid email or password");
      // }
    } catch (err: any) {
      console.log("Login Error:", err?.response?.data);
      setError(err?.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* UI Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>MindPlate</Text>
            <Text style={styles.subtitle}>
              Welcome back! Please login to continue
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Navigation footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>

            <TouchableOpacity onPress={goToSignup}>
              <Text style={styles.footerLink}> Sign up</Text>
            </TouchableOpacity>

          </View>
                      <TouchableOpacity onPress={goToForgot} style={{ marginTop: 10 }}>
              <Text style={{ color: "#007bff", fontSize: 14 }}>Forgot password?</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



