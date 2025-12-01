// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
// } from "react-native";
// import { requestPasswordReset } from "../../services/auth";

// interface Props {
//   onSend: (email: string) => void;
//   goBack: () => void;
// }


// export default function ForgotPasswordScreen({ onSend, goBack }: Props) {
//   const [email, setEmail] = useState("");

//   const handleSendOTP = async () => {
//     if (!email) return Alert.alert("Error", "Enter email");

//     const res = await requestPasswordReset(email);

//     if (res.message) {
//       Alert.alert("Success", "OTP sent");
//       onSend(email);         // ⭐ Move to OTP Screen
//     } else {
//       Alert.alert("Error", res.detail || "Failed");
//     }
//   };

//   return (
//     <View>
//       <Text>Forgot Password</Text>
//       <TextInput value={email} onChangeText={setEmail} />

//       <TouchableOpacity onPress={handleSendOTP}>
//         <Text>Send OTP</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={goBack}>
//         <Text>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, padding: 20, justifyContent: "center"
//   },
//   title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
//   subtitle: { color: "#555", marginBottom: 30 },
//   input: {
//     height: 50, borderWidth: 1, borderColor: "#ddd",
//     borderRadius: 8, paddingHorizontal: 15, marginBottom: 20
//   },
//   button: {
//     backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center"
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   link: { color: "#007AFF", marginTop: 20, textAlign: "center" }
// });

import React, { useState } from "react";
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
  Alert,
} from "react-native";

import { requestPasswordReset } from "../../services/auth";

interface Props {
  onSend: (email: string) => void;  // go to verify screen
  goBack: () => void;               // go back to login
}

export default function ForgotPasswordScreen({ onSend, goBack }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await requestPasswordReset(email);

      if (res.message) {
        Alert.alert("Success", "OTP sent to your email");
        onSend(email); // move to verify OTP screen
      } else {
        setError(res.detail || "Failed to send OTP");
      }
    } catch (err: any) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>MindPlate</Text>
            <Text style={styles.subtitle}>Reset your password</Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* EMAIL */}
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

            {/* SEND OTP */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSendOTP}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// 🔥 SAME STYLE AS LOGIN SCREEN
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  content: { padding: 24, justifyContent: "center" },
  header: { marginBottom: 40, alignItems: "center", marginTop: 50 },
  logo: { fontSize: 32, fontWeight: "bold", color: "#1a1a1a" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8 },
  form: { marginBottom: 20 },

  errorContainer: {
    backgroundColor: "#ffe6e6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: { color: "#cc0000", textAlign: "center", fontSize: 14 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1a1a1a", marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  button: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  backButton: { marginTop: 10, alignItems: "center" },
  backButtonText: { color: "#007AFF", fontSize: 14, fontWeight: "600" },
});
