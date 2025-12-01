// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
// } from "react-native";
// import { verifyOtp } from "../../services/auth";

// interface Props {
//   email: string;
//   onVerified: () => void;
//   goBack: () => void;
// }


// export default function VerifyOTPScreen({ email, goBack, onVerified }: Props) {
//   const [otp, setOtp] = useState("");

//   const handleVerify = async () => {
//     const res = await verifyOtp(email, otp);

//     if (res.message) {
//       Alert.alert("Success", "OTP Verified");
//       onVerified(); // ⭐ go to reset password
//     } else {
//       Alert.alert("Error", "Invalid OTP");
//     }
//   };

//   return (
//     <View>
//       <Text>Enter OTP sent to {email}</Text>

//       <TextInput value={otp} onChangeText={setOtp} />

//       <TouchableOpacity onPress={handleVerify}>
//         <Text>Verify OTP</Text>
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
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" }
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
  Alert,
} from "react-native";

import { verifyOtp } from "../../services/auth";

interface Props {
  email: string;
  onVerified: () => void;
  goBack: () => void;
}

export default function VerifyOTPScreen({ email, goBack, onVerified }: Props) {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    const res = await verifyOtp(email, otp);

    if (res.message) {
      Alert.alert("Success", "OTP verified!");
      onVerified(); // go to reset password
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>MindPlate</Text>
            <Text style={styles.subtitle}>Verify OTP</Text>
            <Text style={styles.subLabel}>Sent to: {email}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#999"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backLink} onPress={goBack}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  content: { padding: 24, justifyContent: "center" },

  header: { marginBottom: 40, alignItems: "center" },
  logo: { fontSize: 32, fontWeight: "bold", color: "#1a1a1a" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8 },
  subLabel: { fontSize: 14, color: "#777", marginTop: 4 },

  form: { marginTop: 20 },

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
    marginTop: 10,
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  backLink: { marginTop: 15, alignItems: "center" },
  backText: { color: "#007AFF", fontSize: 15, fontWeight: "600" },
});
