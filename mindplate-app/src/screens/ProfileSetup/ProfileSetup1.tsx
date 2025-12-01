"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"

interface Props {
  onNext: (data: any) => void
}

export default function ProfileSetup1({ onNext }: Props) {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState("")
  const [error, setError] = useState("")
  const [showGenderPicker, setShowGenderPicker] = useState(false)

  /** ---------------------
   * AUTO CALCULATE BMI
   --------------------- **/
  useEffect(() => {
    if (!height || !weight) {
      setBmi(null)
      setBmiCategory("")
      return
    }

    const h = Number(height)
    const w = Number(weight)

    if (h > 0 && w > 0) {
      const hMeters = h / 100
      const calculatedBmi = w / (hMeters * hMeters)

      setBmi(Number(calculatedBmi.toFixed(1)))

      let category = ""
      if (calculatedBmi < 18.5) category = "Underweight"
      else if (calculatedBmi < 25) category = "Normal"
      else if (calculatedBmi < 30) category = "Overweight"
      else category = "Obese"

      setBmiCategory(category)
    }
  }, [height, weight])

  const getBadgeColor = () => {
    if (bmiCategory === "Normal") return "#10b981"
    if (bmiCategory === "Underweight") return "#6b7280"
    if (bmiCategory === "Overweight") return "#f59e0b"
    return "#ef4444"
  }

  const handleNext = () => {
    setError("")

    if (!age || !gender || !height || !weight) {
      setError("Please fill all fields")
      return
    }

    onNext({
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      bmi,
      bmi_category: bmiCategory,
    })
  }

  const isFormValid = age && gender && height && weight && bmi

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile Setup - Step 1</Text>
            <Text style={styles.subtitle}>Tell us about yourself</Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.form}>
            {/* AGE */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="25"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            {/* GENDER - Changed to dropdown picker instead of text input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity style={styles.selectButton} onPress={() => setShowGenderPicker(!showGenderPicker)}>
                <Text style={gender ? styles.selectText : styles.selectPlaceholder}>
                  {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Select gender"}
                </Text>
              </TouchableOpacity>

              {showGenderPicker && (
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setGender("male")
                      setShowGenderPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setGender("female")
                      setShowGenderPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setGender("other")
                      setShowGenderPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Other</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* HEIGHT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="170"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>

            {/* WEIGHT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="65"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            {bmi !== null && (
              <View style={styles.bmiCard}>
                <View style={styles.bmiRow}>
                  <Text style={styles.bmiLabel}>Your BMI:</Text>
                  <Text style={styles.bmiValue}>{bmi}</Text>
                </View>
                <View style={styles.bmiRow}>
                  <Text style={styles.bmiLabel}>Category:</Text>
                  <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
                    <Text style={styles.badgeText}>{bmiCategory}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* NEXT BUTTON */}
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              onPress={handleNext}
              disabled={!isFormValid}
            >
              <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>Next →</Text>
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
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
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
  error: {
    color: "#ef4444",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
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
  bmiCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  bmiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bmiLabel: {
    fontSize: 14,
    color: "#666",
  },
  bmiValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
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
})
