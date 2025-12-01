// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
// } from "react-native";
// import { resetPassword } from "../../services/auth";

// interface Props {
//   email: string;
//   goBack: () => void;
//   onResetDone: () => void;
// }


// export default function ResetPasswordScreen({ email, goBack, onResetDone }: Props) {
//   const [newPassword, setNewPassword] = useState("");

//   const handleReset = async () => {
//     const res = await resetPassword(email, newPassword);

//     if (res.message) {
//       Alert.alert("Success", "Password reset successfully");
//       onResetDone(); // ⭐ go to login
//     } else {
//       Alert.alert("Error", res.detail || "Failed");
//     }
//   };

//   return (
//     <View>
//       <Text>Reset Password for {email}</Text>

//       <TextInput
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />

//       <TouchableOpacity onPress={handleReset}>
//         <Text>Reset Password</Text>
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

import { resetPassword } from "../../services/auth";

interface Props {
  email: string;
  goBack: () => void;
  onResetDone: () => void;
}

export default function ResetPasswordScreen({ email, goBack, onResetDone }: Props) {
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Enter a new password");
      return;
    }

    const res = await resetPassword(email, newPassword);

    if (res.message) {
      Alert.alert("Success", "Password reset successfully!");
      onResetDone();
    } else {
      Alert.alert("Error", res.detail || "Could not reset password.");
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
            <Text style={styles.subtitle}>Reset your password</Text>
            <Text style={styles.subLabel}>For: {email}</Text>
          </View>

          <View style={styles.form}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#999"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset Password</Text>
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
