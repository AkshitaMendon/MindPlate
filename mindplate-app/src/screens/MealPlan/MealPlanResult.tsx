// "use client"

// import { useState } from "react"
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"
// import type { MealPlanNavigationProps } from "./index"
// interface MealOption {
//   description: string;
//   ingredients: string[];
//   benefits: string;
// }

// interface MealSection {
//   meal_type: string;
//   options: MealOption[];
// }

// interface MealPlan {
//   breakfast: MealSection;
//   lunch: MealSection;
//   dinner: MealSection;
// }


// interface Props {
//   navigation: MealPlanNavigationProps
//   condition: string
//   calorieTarget: number
//   mealPlan: MealPlan
// }

// export default function MealPlanResult({ navigation, mealPlan, condition, calorieTarget }: Props) {
//   const [expandedSection, setExpandedSection] = useState<string | null>("breakfast")
//   // const [mealPlan] = useState<MealPlan>(() => generateMealPlan(condition))
//   // const mealPlan = route.params.mealPlan;



//   const toggleSection = (section: string) => {
//     setExpandedSection(expandedSection === section ? null : section)
//   }

//   const handleSave = () => {
//     navigation.navigate("dashboard", mealPlan)
//   }

//   const handleRegenerate = () => {
//     navigation.navigate("generator")
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView style={styles.container}>
//         <View style={styles.content}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Your Personalized Meal Plan</Text>
//             <Text style={styles.subtitle}>
//               Optimized for {(condition || "wellness").charAt(0).toUpperCase() + (condition || "wellness").slice(1)} • {calorieTarget} kcal/day
//             </Text>
//           </View>

//           {/* Breakfast */}
//           <View style={styles.mealCard}>
//             <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("breakfast")}>
//               <View style={styles.mealTitleContainer}>
//                 <Text style={styles.mealIcon}>🍳</Text>
//                 <Text style={styles.mealTitle}>Breakfast</Text>
//               </View>
//               <Text style={styles.chevron}>{expandedSection === "breakfast" ? "▲" : "▼"}</Text>
//             </TouchableOpacity>

//             {expandedSection === "breakfast" && (
//               <View style={styles.mealContent}>
//                 {mealPlan.breakfast?.options?.map((option, index) => (
//                   <View key={index} style={[styles.mealItem, { borderLeftColor: "#10b981" }]}>
//                     <Text style={styles.itemText}>{option.description}</Text>
//                     <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

//                     <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
//                     {option.ingredients.map((ing, i) => (
//                       <Text key={i} style={styles.noteText}>• {ing}</Text>
//                     ))}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>

//           {/* Lunch */}
//           <View style={styles.mealCard}>
//             <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("lunch")}>
//               <View style={styles.mealTitleContainer}>
//                 <Text style={styles.mealIcon}>🥗</Text>
//                 <Text style={styles.mealTitle}>Lunch</Text>
//               </View>
//               <Text style={styles.chevron}>{expandedSection === "lunch" ? "▲" : "▼"}</Text>
//             </TouchableOpacity>

//             {expandedSection === "lunch" && (
//               <View style={styles.mealContent}>
//                 {mealPlan.lunch?.options?.map((option, index) => (
//                   <View key={index} style={[styles.mealItem, { borderLeftColor: "#3b82f6" }]}>
//                     <Text style={styles.itemText}>{option.description}</Text>
//                     <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

//                     <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
//                     {option.ingredients.map((ing, i) => (
//                       <Text key={i} style={styles.noteText}>• {ing}</Text>
//                     ))}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>

//           <View style={styles.mealCard}>
//             <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("dinner")}>
//               <View style={styles.mealTitleContainer}>
//                 <Text style={styles.mealIcon}>🍚</Text>
//                 <Text style={styles.mealTitle}>Dinner</Text>
//               </View>
//               <Text style={styles.chevron}>{expandedSection === "dinner" ? "▲" : "▼"}</Text>
//             </TouchableOpacity>

//             {expandedSection === "dinner" && (
//               <View style={styles.mealContent}>
//                 {mealPlan.dinner?.options?.map((option, index) => (
//                   <View key={index} style={[styles.mealItem, { borderLeftColor: "#8b5cf6" }]}>
//                     <Text style={styles.itemText}>{option.description}</Text>
//                     <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

//                     <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
//                     {option.ingredients.map((ing, i) => (
//                       <Text key={i} style={styles.noteText}>• {ing}</Text>
//                     ))}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>


//           {/* Action Buttons */}
//           <View style={styles.actionsContainer}>
//             <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//               <Text style={styles.saveButtonIcon}>✅</Text>
//               <Text style={styles.saveButtonText}>Save Plan</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
//               <Text style={styles.regenerateButtonIcon}>🔁</Text>
//               <Text style={styles.regenerateButtonText}>Regenerate</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   header: {
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1a1a1a",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//   },
//   mealCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//     overflow: "hidden",
//   },
//   mealHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//   },
//   mealTitleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   mealIcon: {
//     fontSize: 28,
//   },
//   mealTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1a1a1a",
//   },
//   chevron: {
//     fontSize: 14,
//     color: "#666",
//   },
//   mealContent: {
//     padding: 16,
//     paddingTop: 0,
//     gap: 16,
//   },
//   mealItem: {
//     borderLeftWidth: 4,
//     paddingLeft: 12,
//     paddingVertical: 8,
//     gap: 4,
//   },
//   itemText: {
//     fontSize: 15,
//     color: "#1a1a1a",
//     fontWeight: "500",
//   },
//   noteText: {
//     fontSize: 13,
//     color: "#666",
//     lineHeight: 18,
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     gap: 12,
//     marginTop: 24,
//   },
//   saveButton: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   saveButtonIcon: {
//     fontSize: 18,
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   regenerateButton: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   regenerateButtonIcon: {
//     fontSize: 18,
//   },
//   regenerateButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1a1a1a",
//   },
// })

"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import type { MealPlanNavigationProps } from "./index"
import { generateMealPlan, saveMealPlan } from "@/src/services/mealplan";
interface MealOption {
  description: string;
  ingredients: string[];
  benefits: string;
}

interface MealSection {
  meal_type: string;
  options: MealOption[];
}

interface MealPlan {
  breakfast: MealSection;
  lunch: MealSection;
  dinner: MealSection;
}


interface Props {
  navigation: MealPlanNavigationProps
  condition: string
  calorieTarget: number
  mealPlan: MealPlan
}

export default function MealPlanResult({ navigation, mealPlan, condition, calorieTarget }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>("breakfast")
  // const [mealPlan] = useState<MealPlan>(() => generateMealPlan(condition))
  // const mealPlan = route.params.mealPlan;



  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleSave = async () => {
    try {
      const saved=await saveMealPlan(mealPlan);
      navigation.navigate("dashboard", {saveMealPlan: saved.data});
    } catch (err) {
      console.log("Save plan failed:", err);
    }
  };


  const handleRegenerate = () => {
    navigation.navigate("generator")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your Personalized Meal Plan</Text>
            <Text style={styles.subtitle}>
              Optimized for {(condition || "wellness").charAt(0) + (condition || "wellness").slice(1)} • {calorieTarget} kcal/day
            </Text>
          </View>

          {/* Breakfast */}
          <View style={styles.mealCard}>
            <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("breakfast")}>
              <View style={styles.mealTitleContainer}>
                <Text style={styles.mealIcon}>🍳</Text>
                <Text style={styles.mealTitle}>Breakfast</Text>
              </View>
              <Text style={styles.chevron}>{expandedSection === "breakfast" ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {expandedSection === "breakfast" && (
              <View style={styles.mealContent}>
                {mealPlan.breakfast?.options?.map((option, index) => (
                  <View key={index} style={[styles.mealItem, { borderLeftColor: "#10b981" }]}>
                    <Text style={styles.itemText}>{option.description}</Text>
                    <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

                    <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
                    {option.ingredients.map((ing, i) => (
                      <Text key={i} style={styles.noteText}>• {ing}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Lunch */}
          <View style={styles.mealCard}>
            <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("lunch")}>
              <View style={styles.mealTitleContainer}>
                <Text style={styles.mealIcon}>🥗</Text>
                <Text style={styles.mealTitle}>Lunch</Text>
              </View>
              <Text style={styles.chevron}>{expandedSection === "lunch" ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {expandedSection === "lunch" && (
              <View style={styles.mealContent}>
                {mealPlan.lunch?.options?.map((option, index) => (
                  <View key={index} style={[styles.mealItem, { borderLeftColor: "#3b82f6" }]}>
                    <Text style={styles.itemText}>{option.description}</Text>
                    <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

                    <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
                    {option.ingredients.map((ing, i) => (
                      <Text key={i} style={styles.noteText}>• {ing}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.mealCard}>
            <TouchableOpacity style={styles.mealHeader} onPress={() => toggleSection("dinner")}>
              <View style={styles.mealTitleContainer}>
                <Text style={styles.mealIcon}>🍚</Text>
                <Text style={styles.mealTitle}>Dinner</Text>
              </View>
              <Text style={styles.chevron}>{expandedSection === "dinner" ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {expandedSection === "dinner" && (
              <View style={styles.mealContent}>
                {mealPlan.dinner?.options?.map((option, index) => (
                  <View key={index} style={[styles.mealItem, { borderLeftColor: "#8b5cf6" }]}>
                    <Text style={styles.itemText}>{option.description}</Text>
                    <Text style={styles.noteText}>✨ Benefits: {option.benefits}</Text>

                    <Text style={[styles.noteText, { marginTop: 4 }]}>🥗 Ingredients:</Text>
                    {option.ingredients.map((ing, i) => (
                      <Text key={i} style={styles.noteText}>• {ing}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>


          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonIcon}>✅</Text>
              <Text style={styles.saveButtonText}>Save Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
              <Text style={styles.regenerateButtonIcon}>🔁</Text>
              <Text style={styles.regenerateButtonText}>Regenerate</Text>
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
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  mealTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealIcon: {
    fontSize: 28,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  chevron: {
    fontSize: 14,
    color: "#666",
  },
  mealContent: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  mealItem: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingVertical: 8,
    gap: 4,
  },
  itemText: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  noteText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  saveButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  saveButtonIcon: {
    fontSize: 18,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  regenerateButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  regenerateButtonIcon: {
    fontSize: 18,
  },
  regenerateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
})

