"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { createProfile } from "../../services/profile"

interface Props {
  step1Data: any
  onFinish: (profile: any) => void
}

export default function ProfileSetup2({ step1Data, onFinish }: Props) {
  const [mentalHealthFocus, setMentalHealthFocus] = useState("")
  const [showMentalHealthPicker, setShowMentalHealthPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [origin, setOrigin] = useState("");
  const [residence, setResidence] = useState("");


  const handleFinish = async () => {
    setError("")

    if (!mentalHealthFocus) {
      setError("Please fill all fields")
      return
    }

    // Calculate BMI
    const heightMeters = step1Data.height / 100
    const bmi = step1Data.weight / (heightMeters * heightMeters)

    let bmiCategory = ""
    if (bmi < 18.5) bmiCategory = "Underweight"
    else if (bmi < 25) bmiCategory = "Normal"
    else if (bmi < 30) bmiCategory = "Overweight"
    else bmiCategory = "Obese"

    const payload = {
      age: step1Data.age,
      height: step1Data.height,
      weight: step1Data.weight,
      gender: step1Data.gender,
      bmi,
      bmi_category: bmiCategory,
      mental_health_focus: mentalHealthFocus,
      origin: origin,
      residence: residence
    }

    try {
      setLoading(true)
      const response = await createProfile(payload)
      onFinish(response.data)
    } catch (err) {
      console.log("Profile creation failed:", err)
      setError("Failed to save profile.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = mentalHealthFocus

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile Setup - Step 2</Text>
            <Text style={styles.subtitle}>Set your mental health focus</Text>
          </View>

          <View style={styles.form}>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mental Health Focus</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowMentalHealthPicker(!showMentalHealthPicker)}
              >
                <Text style={mentalHealthFocus ? styles.selectText : styles.selectPlaceholder}>
                  {mentalHealthFocus || "Select condition"}
                </Text>
              </TouchableOpacity>

              {showMentalHealthPicker && (
                <View style={styles.pickerContainer}>
                  {["Anxiety", "Stress", "Depression"].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.pickerItem}
                      onPress={() => {
                        // setMentalHealthFocus(option)
                        setMentalHealthFocus(option.toLowerCase())
                        setShowMentalHealthPicker(false)
                      }}
                    >
                      <Text style={styles.pickerItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country of Origin</Text>
              <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
                placeholder="Enter your origin country"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country of Residence</Text>
              <TextInput
                style={styles.input}
                value={residence}
                onChangeText={setResidence}
                placeholder="Enter your current country"
                placeholderTextColor="#999"
              />
            </View>


            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              onPress={handleFinish}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>
                  Continue to Dashboard →
                </Text>
              )}
            </TouchableOpacity>
            
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  selectButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#1a1a1a",
    textTransform: "capitalize",
  },
  selectPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  pickerContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 1000,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  button: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#d1d5db",
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  buttonTextDisabled: {
    color: "#9ca3af",
  },
  error: {
    color: "#ef4444",
    marginBottom: 16,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
})
