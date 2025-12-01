// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"

// interface Props {
//   onSave: (mood: number, moodLabel: string, note: string) => void
//   onBack: () => void
// }

// const moodOptions = [
//   { value: 1, emoji: "😣", label: "Stressed" },
//   { value: 2, emoji: "😔", label: "Low" },
//   { value: 3, emoji: "😐", label: "Neutral" },
//   { value: 4, emoji: "🙂", label: "Good" },
//   { value: 5, emoji: "😀", label: "Great" },
// ]

// export default function MoodTrackerScreen({ onSave, onBack }: Props) {
//   const [selectedMood, setSelectedMood] = useState<number>(3)
//   const [note, setNote] = useState("")

//   const handleSave = () => {
//     const selectedOption = moodOptions.find((option) => option.value === selectedMood)
//     if (selectedOption) {
//       onSave(selectedMood, selectedOption.label, note)
//     }
//   }

//   const isFormValid = selectedMood > 0

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
//         <View style={styles.content}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton} onPress={onBack}>
//               <Text style={styles.backIcon}>←</Text>
//               <Text style={styles.backText}>Back to Dashboard</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Main Card */}
//           <View style={styles.card}>
//             <Text style={styles.title}>How are you feeling today?</Text>
//             <Text style={styles.subtitle}>Track your mood to monitor your wellness</Text>

//             {/* Mood Selector */}
//             <View style={styles.moodGrid}>
//               {moodOptions.map((option) => (
//                 <TouchableOpacity
//                   key={option.value}
//                   onPress={() => setSelectedMood(option.value)}
//                   style={[styles.moodButton, selectedMood === option.value && styles.moodButtonSelected]}
//                 >
//                   <Text style={styles.moodEmoji}>{option.emoji}</Text>
//                   <Text style={styles.moodLabel}>{option.label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Note Input */}
//             <View style={styles.noteSection}>
//               <Text style={styles.noteLabel}>Add a note (optional)</Text>
//               <TextInput
//                 style={styles.noteInput}
//                 placeholder="What's on your mind?"
//                 placeholderTextColor="#999"
//                 value={note}
//                 onChangeText={setNote}
//                 multiline
//                 numberOfLines={4}
//                 textAlignVertical="top"
//               />
//             </View>

//             {/* Save Button */}
//             <TouchableOpacity
//               style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
//               onPress={handleSave}
//               disabled={!isFormValid}
//             >
//               <Text style={styles.saveButtonText}>Save Mood</Text>
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
//     paddingTop: 16,
//     marginBottom: 24,
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   backIcon: {
//     fontSize: 24,
//     color: "#1a1a1a",
//   },
//   backText: {
//     fontSize: 16,
//     color: "#1a1a1a",
//     fontWeight: "500",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
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
//     marginBottom: 24,
//   },
//   moodGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginBottom: 24,
//   },
//   moodButton: {
//     flex: 1,
//     minWidth: "18%",
//     aspectRatio: 1,
//     borderWidth: 2,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 8,
//   },
//   moodButtonSelected: {
//     borderColor: "#007AFF",
//     backgroundColor: "#eff6ff",
//     transform: [{ scale: 1.05 }],
//   },
//   moodEmoji: {
//     fontSize: 32,
//     marginBottom: 4,
//   },
//   moodLabel: {
//     fontSize: 10,
//     color: "#1a1a1a",
//     textAlign: "center",
//   },
//   noteSection: {
//     marginBottom: 24,
//   },
//   noteLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#1a1a1a",
//     marginBottom: 8,
//   },
//   noteInput: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     fontSize: 14,
//     backgroundColor: "#fff",
//   },
//   saveButton: {
//     height: 50,
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveButtonDisabled: {
//     backgroundColor: "#d1d5db",
//     opacity: 0.6,
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#fff",
//   },
// })

"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"

interface Props {
  onSave: (mood: number, moodLabel: string, note: string) => void
  onBack: () => void
}

const moodOptions = [
  { value: 1, emoji: "😣", label: "Tensed" },
  { value: 2, emoji: "😔", label: "Low" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😀", label: "Great" },
]

export default function MoodTrackerScreen({ onSave, onBack }: Props) {
  const [selectedMood, setSelectedMood] = useState<number>(3)
  const [note, setNote] = useState("")

  const handleSave = () => {
    const selectedOption = moodOptions.find((option) => option.value === selectedMood)
    if (selectedOption) {
      onSave(selectedMood, selectedOption.label, note)
    }
  }

  const isFormValid = selectedMood > 0

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backIcon}>←</Text>
              <Text style={styles.backText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.title}>How are you feeling today?</Text>
            <Text style={styles.subtitle}>Track your mood to monitor your wellness</Text>

            {/* Mood Selector */}
            <View style={styles.moodGrid}>
              {moodOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSelectedMood(option.value)}
                  style={[styles.moodButton, selectedMood === option.value && styles.moodButtonSelected]}
                >
                  <Text style={styles.moodEmoji}>{option.emoji}</Text>
                  <Text style={styles.moodLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Note Input */}
            <View style={styles.noteSection}>
              <Text style={styles.noteLabel}>Add a note (optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#999"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>Save Mood</Text>
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
    paddingTop: 16,
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backIcon: {
    fontSize: 24,
    color: "#1a1a1a",
    marginTop: 10,
  },
  backText: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
    marginTop: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: 24,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 24,
  },
  moodButton: {
    width: "18%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
  },
  moodButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#eff6ff",
    transform: [{ scale: 1.05 }],
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 0,
  },
  moodLabel: {
    fontSize: 10,
    color: "#1a1a1a",
    textAlign: "center",
  },
  noteSection: {
    marginBottom: 24,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  noteInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  saveButton: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#d1d5db",
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})
