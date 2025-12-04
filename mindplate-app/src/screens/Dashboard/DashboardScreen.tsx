import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"

type Props = {
  userProfile: any
  savedMealPlan?: any
  onViewFullPlan?: () => void
  onTrackMood?: () => void
  onNavigateToSettings?: () => void
  currentMood?: number
  currentMoodLabel?: string
  moodNote?: string
}

const moodEmojis = ["😣", "😔", "😐", "🙂", "😀"]
const moodLabels = ["Stressed", "Low", "Neutral", "Good", "Great"]

export default function DashboardScreen({
  userProfile,
  savedMealPlan,
  onViewFullPlan,
  onTrackMood,
  onNavigateToSettings,
  currentMood = 3,
  currentMoodLabel = "Neutral",
  moodNote = "",
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi there 👋</Text>
              <Text style={styles.subGreeting}>Welcome back to your wellness journey</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={onNavigateToSettings}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Overview</Text>
            <View style={styles.statsContainer}>
              {/* BMI */}
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>BMI</Text>
                <View style={styles.statValueContainer}>
                  <Text style={styles.statValue}>{userProfile?.bmi}</Text>
                </View>
              </View>

              {/* BMI Category */}
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>BMI Category</Text>
                <View style={[styles.badge, { backgroundColor: getBMIColor(userProfile?.bmiCategory || "") }]}>
                  <Text style={styles.badgeText}>{userProfile?.bmiCategory ?? "Not set"}</Text>
                </View>
              </View>

              {/* NEW: Mental Health Condition */}
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Mental Health</Text>
                <Text style={styles.statValue}>
                  {userProfile?.mentalHealthCondition
                    ? userProfile.mentalHealthCondition.charAt(0).toUpperCase() +
                      userProfile.mentalHealthCondition.slice(1)
                    : "Not set"}
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Meal Plan</Text>
            {savedMealPlan ? (
              <View style={styles.mealPlanContent}>
              {["breakfast", "lunch", "dinner"].map((mealKey) => {
                const meal = savedMealPlan[mealKey];
                const option = meal?.options?.[0];

                return (
                  <View key={mealKey} style={styles.mealSection}>
                    <Text style={styles.mealSectionTitle}>
                      {mealKey === "breakfast" ? "🍳 Breakfast" :
                      mealKey === "lunch" ? "🥗 Lunch" :
                      "🍚 Dinner"}
                    </Text>

                    {/* Description */}
                    <Text style={styles.mealSectionText}>
                      {option?.description || "Description not available"}
                    </Text>

                    {/* Ingredients */}
                    {option?.ingredients && (
                      <Text style={styles.mealSubText}>
                        <Text style={{ fontWeight: "600" }}>Ingredients: </Text>
                        {option.ingredients.join(", ")}
                      </Text>
                    )}

                    {/* Benefits */}
                    {option?.benefits && (
                      <Text style={styles.mealSubText}>
                        <Text style={{ fontWeight: "600" }}>Benefits: </Text>
                        {option.benefits}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>

            ) : (
              <>
                <Text style={styles.cardDescription}>Generate your first meal plan to get started</Text>
                <View style={styles.mealPlanEmpty}>
                  <Text style={styles.emptyText}>No meal plan generated yet</Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={onViewFullPlan}>
              <Text style={styles.actionIcon}>🍽️</Text>
              <Text style={styles.actionText}>View Full Plan</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.actionButton} onPress={onTrackMood}>
              <Text style={styles.actionIcon}>😊</Text>
              <Text style={styles.actionText}>Track Mood</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Wellness Tip</Text>
            <Text style={styles.tipText}>{getWellnessTip(userProfile?.mentalHealthCondition)}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 16,
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 24,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  statsContainer: {
    gap: 20,
  },
  statItem: {
    gap: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  moodNote: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  mealPlanContent: {
    gap: 12,
  },
  mealSection: {
    gap: 4,
  },
  mealSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  mealSectionText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  mealPlanEmpty: {
    paddingVertical: 32,
    alignItems: "center",
  },
  mealSubText: {
  fontSize: 12,
  color: "#555",
  marginTop: 2,
  lineHeight: 16,
},
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  userDetailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    minWidth: "47%",
    height: 96,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionIcon: {
    fontSize: 28,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  tipCard: {
    backgroundColor: "#f3e8ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
})

function getBMIColor(category: string) {
  if(!category) return "#6b7280";
  switch (category?.toLowerCase?.()|| "normal") {
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

function getWellnessTip(condition: string) {
  switch (condition?.toLowerCase()) {
    case "anxiety":
      return "Try including omega-3 rich foods like salmon and walnuts to help reduce anxiety."
    case "stress":
      return "Magnesium-rich foods like dark chocolate and spinach can help manage stress levels."
    case "depression":
      return "Foods rich in vitamin D and omega-3s can support mood regulation."
    default:
      return "Regular meals with complex carbohydrates can help stabilize mood throughout the day."
  }
}
