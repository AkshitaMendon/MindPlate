"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native"
import type { MealPlanNavigationProps } from "./index"
import { generateMealPlan, saveMealPlan } from "@/src/services/mealplan"

interface UserProfile {
  age: number
  gender: string
  height: number
  weight: number
  bmi: number
  bmiCategory: string
  mentalHealthCondition: string
  origin: string
  residence: string
}

interface Props {
  navigation: MealPlanNavigationProps
  userProfile: UserProfile
}

export default function MealPlanGenerator({ navigation, userProfile }: Props) {
  const [condition, setCondition] = useState(userProfile.mentalHealthCondition)
  const [calorieTarget, setCalorieTarget] = useState("")
  const [showConditionPicker, setShowConditionPicker] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!condition || !calorieTarget) return;

    setIsGenerating(true);

    try {
      const response = await generateMealPlan({
        age: userProfile.age,
        gender: userProfile.gender,
        bmi: userProfile.bmi,
        mental_health: condition,
        calories: Number(calorieTarget),
        origin: userProfile.origin,
        residence: userProfile.residence,
      });

      navigation.navigate("result", {
        mealPlan: response,
        condition: condition,
        calorieTarget: Number(calorieTarget)
      });
    } catch (error) {
      console.log("Meal plan generation failed:", error);
      Alert.alert("Error", "Failed to generate meal plan");
    }

    setIsGenerating(false);
  };


  const getBMIColor = (category: string) => {
    switch (category) {
      case "underweight":
        return "#3b82f6"
      case "normal":
        return "#10b981"
      case "overweight":
        return "#f59e0b"
      case "obese":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const isFormValid = condition && calorieTarget

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Generate Meal Plan</Text>
              <Text style={styles.subtitle}>Customize your personalized nutrition plan</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Mental Health Focus */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mental Health Focus</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowConditionPicker(!showConditionPicker)}
              >
                <Text style={condition ? styles.selectText : styles.selectPlaceholder}>
                  {condition ? condition.charAt(0).toUpperCase() + condition.slice(1) : "Select condition"}
                </Text>
              </TouchableOpacity>

              {showConditionPicker && (
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setCondition("anxiety")
                      setShowConditionPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Anxiety</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setCondition("stress")
                      setShowConditionPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Stress</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setCondition("depression")
                      setShowConditionPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>Depression</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setCondition("general")
                      setShowConditionPicker(false)
                    }}
                  >
                    <Text style={styles.pickerItemText}>General Wellness</Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </View>

            {/* BMI Display */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your BMI</Text>
              <View style={styles.bmiDisplay}>
                <Text style={styles.bmiValue}>{userProfile.bmi}</Text>
                <View style={[styles.badge, { backgroundColor: getBMIColor(userProfile.bmiCategory) }]}>
                  <Text style={styles.badgeText}>{userProfile.bmiCategory}</Text>
                </View>
              </View>
            </View>

            {/* Daily Calorie Target */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Daily Calorie Target (kcal)</Text>
              <TextInput
                style={styles.input}
                placeholder="2000"
                placeholderTextColor="#999"
                value={calorieTarget}
                onChangeText={setCalorieTarget}
                keyboardType="numeric"
              />
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={[styles.button, (!isFormValid || isGenerating) && styles.buttonDisabled]}
              onPress={handleGenerate}
              disabled={!isFormValid || isGenerating}
            >
              {isGenerating ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.buttonText}>Generating...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.sparkle}>✨</Text>
                  <Text style={styles.buttonText}>Generate Plan</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  backButton: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 20,
    marginTop: 20,
  },
  headerTextContainer: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 24,
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
    overflow: "hidden",
  },
  pickerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  bmiDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bmiValue: {
    fontSize: 20,
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sparkle: {
    fontSize: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
