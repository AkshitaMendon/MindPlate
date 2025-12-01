"use client"

import { useState } from "react"
import MealPlanGenerator from "./MealPlanGenerator"
import MealPlanResult from "./MealPlanResult"

type MealPlanScreen = "generator" | "result" | "dashboard"

interface MealItem {
  item: string
  note: string
}

interface MealPlan {
  condition: string
  breakfast: MealItem[]
  lunch: MealItem[]
  dinner: MealItem[]
}

export interface MealPlanNavigationProps {
  navigate: (screen: MealPlanScreen, data?: any) => void
}

interface Props {
  userProfile: any
  savedMealPlan: any;
  onBack: () => void
  onSave: (mealPlan: MealPlan) => void
}

export default function MealPlanNavigator({ userProfile, savedMealPlan, onBack, onSave }: Props) {
  // const [currentScreen, setCurrentScreen] = useState<MealPlanScreen>("generator")
  // const [generationData, setGenerationData] = useState<any>(null)
  const [currentScreen, setCurrentScreen] = useState<MealPlanScreen>(
    savedMealPlan ? "result" : "generator"
  );

  const [generationData, setGenerationData] = useState<any>(
    savedMealPlan
      ? {
          mealPlan: savedMealPlan.mealPlan,
          condition: savedMealPlan.condition,
          calorieTarget: savedMealPlan.calorieTarget,
        }
      : null
  );



  const navigation: MealPlanNavigationProps = {
    navigate: (screen: MealPlanScreen, data?: any) => {
      if (screen === "result") {
        setGenerationData(data)
        setCurrentScreen("result")
      } else if (screen === "generator") {
        setCurrentScreen("generator")
      } else if (screen === "dashboard") {
        if (data) {
          onSave(data)
        }
        onBack()
      }
    },
  }

  // if (currentScreen === "generator") {
  //   return <MealPlanGenerator navigation={navigation} userProfile={userProfile} />
  // }
  // if(!generationData){
  //   return null;
  // }
  if (currentScreen === "generator") {
  return (
    <MealPlanGenerator
      navigation={navigation}
      userProfile={userProfile}
    />
  );
}
if (currentScreen === "result") {
  return (
    <MealPlanResult
      navigation={navigation}
      mealPlan={generationData?.mealPlan ?? savedMealPlan}
      condition={generationData?.condition ?? userProfile.mentalHealthCondition}
      calorieTarget={generationData?.calorieTarget ?? 0}
    />
  );
}

  return (
    <MealPlanResult
        navigation={navigation}
        mealPlan={generationData?.mealPlan}
        calorieTarget={generationData?.calorieTarget}
        condition={generationData?.condition}
    />
  )
}
