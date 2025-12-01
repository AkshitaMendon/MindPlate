"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";   // ⭐ ADDED
import { updateProfile } from "../../services/profile";

// Replace with your backend URL
// const BASE_URL = "http://YOUR_BACKEND_URL";  // ⭐ ADDED — update this

interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  bmiCategory: string;
  mentalHealthCondition: string;
  origin: string;
  residence: string
}

interface Props {
  userProfile: UserProfile;
  userName?: string;
  userEmail?: string;
  onUpdateProfile: (
    updatedProfile: UserProfile,
    name?: string,
    email?: string
  ) => void;
  onDeleteAccount: () => void;
  onBack: () => void;
}

export default function SettingsScreen({
  userProfile,
  userName,
  userEmail,
  onUpdateProfile,
  onDeleteAccount,
  onBack,
}: Props){
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSetup, setIsEditingSetup] = useState(false);

  // Profile fields
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  // const [age, setAge] = useState(userProfile.age.toString());
  const [age, setAge] = useState(userProfile?.age ? userProfile.age.toString() : "");


  // Setup fields
  const [gender, setGender] = useState(userProfile.gender);
  const [height, setHeight] = useState(userProfile.height.toString());
  const [weight, setWeight] = useState(userProfile.weight.toString());
  const [origin, setOrigin] = useState(userProfile.origin || "");
  const [residence, setResidence] = useState(userProfile.residence || "");

  const [mentalHealthCondition, setMentalHealthCondition] = useState(
    userProfile.mentalHealthCondition
  );

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showConditionPicker, setShowConditionPicker] = useState(false);

  // BMI calculation
  const calculateBMI = (heightCm: number, weightKg: number) => {
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmiValue = weightKg / (heightM * heightM);
      const bmi = Number(bmiValue.toFixed(1));

      let bmiCategory = "";
      if (bmiValue < 18.5) bmiCategory = "Underweight";
      else if (bmiValue < 25) bmiCategory = "Normal";
      else if (bmiValue < 30) bmiCategory = "Overweight";
      else bmiCategory = "Obese";

      return { bmi, bmiCategory };
    }
    return { bmi: userProfile.bmi, bmiCategory: userProfile.bmiCategory };
  };

  // ⭐ NEW: BACKEND UPDATE API CALL
  // const updateProfileInBackend = async (updatedProfile: UserProfile) => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");  // ⭐ GET TOKEN

  //     if (!token) {
  //       Alert.alert("Error", "Authentication error. Please login again.");
  //       return;
  //     }

  //     // ⭐ BACKEND NEEDS snake_case FIELD NAMES
  //     const body = {
  //       age: updatedProfile.age,
  //       gender: updatedProfile.gender,
  //       height: updatedProfile.height,
  //       weight: updatedProfile.weight,
  //       bmi: updatedProfile.bmi,
  //       bmi_category: updatedProfile.bmiCategory,
  //       mental_health_focus: updatedProfile.mentalHealthCondition,
  //     };

  //     const response = await fetch(`${BASE_URL}/profile/update`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,        // ⭐ ADD TOKEN
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     if (!response.ok) {
  //       const err = await response.json();
  //       throw new Error(err.detail || "Failed to update profile");
  //     }

  //     return await response.json();
  //   } catch (error: any) {
  //     Alert.alert("Error", error.message || "Failed to update profile");
  //     return null;
  //   }
  // };

const handleSaveProfile = async () => {
  const { bmi, bmiCategory } = calculateBMI(Number(height), Number(weight));

  const backendData = {
    age: Number(age),
    gender,
    height: Number(height),
    weight: Number(weight),
    bmi,
    bmi_category: bmiCategory,
    mental_health_focus: mentalHealthCondition,
    origin,
    residence
  };

  try {
    await updateProfile(backendData);   // ⭐ USE SERVICE FUNCTION ONLY

    const updatedProfile: UserProfile = {
      age: backendData.age,
      gender: backendData.gender,
      height: backendData.height,
      weight: backendData.weight,
      bmi: backendData.bmi,
      bmiCategory: backendData.bmi_category,
      mentalHealthCondition: backendData.mental_health_focus,
      origin: backendData.origin,
      residence: backendData.residence,
    };

    onUpdateProfile(updatedProfile, name, email);
    setIsEditingProfile(false);
    setIsEditingSetup(false);

    Alert.alert("Success", "Profile updated successfully!");

  } catch (err) {
    console.log("Profile update error:", err);
    Alert.alert("Update failed", "Unable to update profile. Try again.");
  }
};

  // ⭐ UPDATED SAVE FUNCTION
//   const handleSaveProfile = async () => {
//     const { bmi, bmiCategory } = calculateBMI(
//       Number(height),
//       Number(weight)
//     );

//     const updatedProfile: UserProfile = {
//       age: Number(age),
//       gender,
//       height: Number(height),
//       weight: Number(weight),
//       bmi,
//       bmiCategory,
//       mentalHealthCondition,
//     };

//     await updateProfile({
//     age,
//     gender,
//     height,
//     weight,
//     bmi,
//     bmi_category: bmiCategory,
//     mental_health_focus: mentalHealthCondition
// });


//     // ⭐ FIRST UPDATE DB
//     const backendResult = await updateProfileInBackend(updatedProfile);

//     if (!backendResult) return; // Stop if backend failed

//     // ⭐ THEN UPDATE LOCAL APP STATE
//     onUpdateProfile(updatedProfile, name, email);

//     setIsEditingProfile(false);
//     setIsEditingSetup(false);

//     Alert.alert("Success", "Profile updated successfully!");
//   };


  const handleDeleteAccount = () => {
    Alert.alert(
      "Log Out",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: onDeleteAccount },
      ]
    );
  };
  if (!userProfile) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading profile...</Text>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your account</Text>
            </View>
          </View>

          {/* Profile Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Profile Information</Text>
              {!isEditingProfile && (
                <TouchableOpacity onPress={() => setIsEditingProfile(true)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditingProfile ? (
              <View style={styles.editForm}>
                {/* <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View> */}

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    placeholder="Enter your age"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Country of Origin</Text>
                  <TextInput
                    style={styles.input}
                    value={origin}
                    onChangeText={setOrigin}
                    placeholder="Enter origin country"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Residence</Text>
                  <TextInput
                    style={styles.input}
                    value={residence}
                    onChangeText={setResidence}
                    placeholder="Enter residence"
                  />
                </View>



                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditingProfile(false)
                    setName(userName)
                    setEmail(userEmail)
                    setAge(userProfile.age.toString())
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoList}>
                {/* <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{name}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{email}</Text>
                </View> */}
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoValue}>{userProfile.age} years</Text>
                </View>
                  <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Country of Origin</Text>
                  <Text style={styles.infoValue}>{origin}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Current Residence</Text>
                  <Text style={styles.infoValue}>{residence}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Health Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Health Information</Text>
              {!isEditingSetup && (
                <TouchableOpacity onPress={() => setIsEditingSetup(true)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditingSetup ? (
              <View style={styles.editForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity style={styles.selectButton} onPress={() => setShowGenderPicker(!showGenderPicker)}>
                    <Text style={styles.selectText}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Text>
                  </TouchableOpacity>
                  {showGenderPicker && (
                    <View style={styles.pickerContainer}>
                      {["male", "female", "other"].map((g) => (
                        <TouchableOpacity
                          key={g}
                          style={styles.pickerItem}
                          onPress={() => {
                            setGender(g)
                            setShowGenderPicker(false)
                          }}
                        >
                          <Text style={styles.pickerItemText}>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Enter height"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Enter weight"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mental Health Condition</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowConditionPicker(!showConditionPicker)}
                  >
                    <Text style={styles.selectText}>
                      {mentalHealthCondition.charAt(0).toUpperCase() + mentalHealthCondition.slice(1)}
                    </Text>
                  </TouchableOpacity>
                  {showConditionPicker && (
                    <View style={styles.pickerContainer}>
                      {["anxiety", "stress", "depression", "none"].map((condition) => (
                        <TouchableOpacity
                          key={condition}
                          style={styles.pickerItem}
                          onPress={() => {
                            setMentalHealthCondition(condition)
                            setShowConditionPicker(false)
                          }}
                        >
                          <Text style={styles.pickerItemText}>
                            {condition.charAt(0).toUpperCase() + condition.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditingSetup(false)
                    setGender(userProfile.gender)
                    setHeight(userProfile.height.toString())
                    setWeight(userProfile.weight.toString())
                    setMentalHealthCondition(userProfile.mentalHealthCondition)
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoList}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoValue}>
                    {gender
                      ? gender.charAt(0).toUpperCase() + gender.slice(1)
                      : "Not set"}
                  </Text>

                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoValue}>{userProfile.height} cm</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{userProfile.weight} kg</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>BMI</Text>
                  <Text style={styles.infoValue}>
                    {userProfile.bmi} ({userProfile.bmiCategory})
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Mental Health</Text>
                  <Text style={styles.infoValue}>
                    {mentalHealthCondition
  ? mentalHealthCondition.charAt(0).toUpperCase() + mentalHealthCondition.slice(1)
  : "Not set"}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Delete Account Card */}
          <View style={styles.dangerCard}>
            <Text style={styles.dangerCardTitle}>Danger Zone</Text>
            <Text style={styles.dangerCardDescription}>Once you logout your account, there is no going back.</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteButtonText}>Logout</Text>
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
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 16,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    color: "#1a1a1a",
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  editButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  editForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
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
  saveButton: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cancelButton: {
    height: 50,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  dangerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  dangerCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: 8,
  },
  dangerCardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  deleteButton: {
    height: 50,
    backgroundColor: "#dc2626",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
