// // App.tsx
// import React, { useState } from "react";
// import { View } from "react-native";

// import SplashScreen from "./src/screens/Splash/SplashScreen";
// import AuthNavigator from "./src/screens/Auth";
// import ProfileSetupNavigator from "./src/screens/ProfileSetup";
// import DashboardScreen from "./src/screens/Dashboard";
// import SettingsScreen from "./src/screens/Settings";
// import { getProfile } from "./src/services/profile";
// import MealPlanNavigator from "./src/screens/MealPlan";
// import { getSavedMealPlan } from "./src/services/mealplan";

// export default function App() {
//   // Controls which page is shown
//   const [screen, setScreen] = useState<"splash" | "auth" | "profile1" | "dashboard" | "mealplan" |"settings">("splash");

//   // Stores completed profile
//   const [profileData, setProfileData] = useState<any>();
//   const [userName, setUserName] = useState("User");
//   const [userEmail, setUserEmail] = useState("user@example.com");
//   // const [savedMealPlan, setSavedMealPlan] = useState(null);
//   const [savedMealPlan, setSavedMealPlan] = useState<any>(null);


//   // When user saves updated profile in Settings
//   const handleUpdateProfile = (updatedProfile: any, name?: string, email?: string) => {
//     setProfileData(updatedProfile);
//     if (name) setUserName(name);
//     if (email) setUserEmail(email);
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {/* 🔵 SPLASH SCREEN FIRST */}
//       {screen === "splash" && (
//         <SplashScreen onFinish={() => setScreen("auth")} />
//       )}

//       {/* 🟢 AUTH SCREENS */}
//       {screen === "auth" && (
//         <AuthNavigator
//           onAuthResult={async (next) => {
//             if (next === "dashboard") {
//               const profile = await getProfile();
//               console.log("LOADED PROFILE:", profile);
//               const savedMealPlan=await getSavedMealPlan();
//               setSavedMealPlan(savedMealPlan);

//               if (!profile) {
//                 console.log("⚠ No profile found, redirecting to setup");
//                 setScreen("profile1");
//               } else {
//                 setProfileData(profile);
//                 setScreen("dashboard");
//               }
//             } else {
//               setScreen("profile1");
//             }
//           }}


//           // onAuthResult={(next) => {
//           //   if (next === "dashboard") setScreen("dashboard");
//           //   else setScreen("profile1");
//           // }}
//         />
//       )}


//       {/* 🟣 PROFILE SETUP FLOW */}
//       {screen === "profile1" && (
//         <ProfileSetupNavigator
//           onComplete={(fullProfile) => {
//             setProfileData(fullProfile);     // Save profile data
//             setScreen("dashboard");          // Move to dashboard
//           }}
//         />
//       )}

//       {/* 🟡 DASHBOARD */}
//       {screen === "dashboard" && (
//         <DashboardScreen userProfile={profileData}
//         onNavigateToSettings={() => setScreen("settings")} 
//         savedMealPlan={savedMealPlan}
//         onViewFullPlan={()=> setScreen("mealplan")}/>
//       )}

//       {/* 🟣 MEAL PLAN WORKFLOW */}
//       {screen === "mealplan" && (
//         <MealPlanNavigator
//           userProfile={profileData}
//           savedMealPlan={savedMealPlan}
//           onBack={() => setScreen("dashboard")}
//           onSave={(plan) => {
//             setSavedMealPlan(plan);
//             setScreen("dashboard");
//           }}
//         />
//       )}

      

//             {/* ⚙️ SETTINGS PAGE */}
//       {screen === "settings" && (
//         <SettingsScreen
//           userProfile={profileData}
//           userName={userName}
//           userEmail={userEmail}
//           onUpdateProfile={handleUpdateProfile}
//           onDeleteAccount={() => {
//             // You can change this behavior if needed
//             setScreen("auth");
//             setProfileData(null);
//           }}
//           onBack={() => setScreen("dashboard")}                // ✅ GO BACK TO DASHBOARD
//         />
//       )}
    

      

      
      
//     </View>
//   );
// }

// App.tsx
import React, { useState , useEffect } from "react";
import { View } from "react-native";

import SplashScreen from "./src/screens/Splash/SplashScreen";
import AuthNavigator from "./src/screens/Auth";
import ProfileSetupNavigator from "./src/screens/ProfileSetup";
import DashboardScreen from "./src/screens/Dashboard";
import SettingsScreen from "./src/screens/Settings";
import { getProfile } from "./src/services/profile";
import MealPlanNavigator from "./src/screens/MealPlan";
import { getSavedMealPlan } from "./src/services/mealplan";

export default function App() {
  // Controls which page is shown
  const [screen, setScreen] = useState<"splash" | "auth" | "profile1" | "dashboard" | "mealplan" |"settings">("splash");

  // Stores completed profile
  const [profileData, setProfileData] = useState<any>();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  // const [savedMealPlan, setSavedMealPlan] = useState(null);
  const [savedMealPlan, setSavedMealPlan] = useState<any>(null);


  // When user saves updated profile in Settings
  const handleUpdateProfile = (updatedProfile: any, name?: string, email?: string) => {
    setProfileData(updatedProfile);
    if (name) setUserName(name);
    if (email) setUserEmail(email);
  };
  useEffect(() => {
    if (screen === "dashboard") {
      getSavedMealPlan().then((plan) => {
        setSavedMealPlan(plan);
      });
    }
  }, [screen]);

  return (
    <View style={{ flex: 1 }}>

      {/* 🔵 SPLASH SCREEN FIRST */}
      {screen === "splash" && (
        <SplashScreen onFinish={() => setScreen("auth")} />
      )}

      {/* 🟢 AUTH SCREENS */}
      {screen === "auth" && (
        <AuthNavigator
          onAuthResult={async (next, name, email) => {
            if (name) setUserName(name);
            if(email) setUserEmail(email);
            if (next === "dashboard") {
              const profile = await getProfile();
              console.log("LOADED PROFILE:", profile);
              if (!profile) {
                console.log("⚠ No profile found, redirecting to setup");
                setScreen("profile1");
                return;
              } setProfileData(profile);
              const plan = await getSavedMealPlan();
              setSavedMealPlan(plan);
              setScreen("dashboard");
            }else{
              setScreen("profile1");
            }
          }
        }

          // onAuthResult={(next) => {
          //   if (next === "dashboard") setScreen("dashboard");
          //   else setScreen("profile1");
          // }}
        />
      )}


      {/* 🟣 PROFILE SETUP FLOW */}
      {screen === "profile1" && (
        <ProfileSetupNavigator
          onComplete={async () => {
            try{
            const profile = await getProfile();   // 🔥 fetch complete profile from backend
            setProfileData(profile);

            const plan = await getSavedMealPlan(); 
            setSavedMealPlan(plan);

            setScreen("dashboard");
            }catch (err){
              console.log("Profile load error:", err);
            }
          }}

        />
      )}

      {/* 🟡 DASHBOARD */}
      {screen === "dashboard" && (
        <DashboardScreen 
        userProfile={profileData}
        savedMealPlan={savedMealPlan}
        onNavigateToSettings={() => setScreen("settings")} 
        onViewFullPlan={()=> setScreen("mealplan")}/>
      )}

      {/* 🟣 MEAL PLAN WORKFLOW */}
      {screen === "mealplan" && (
        <MealPlanNavigator
          userProfile={profileData}
          savedMealPlan={savedMealPlan}
          onBack={() => setScreen("dashboard")}
          onSave={(plan) => {
            setSavedMealPlan(plan);
            setScreen("dashboard");
          }}
        />
      )}

      

            {/* ⚙️ SETTINGS PAGE */}
      {screen === "settings" && (
        <SettingsScreen
          userProfile={profileData}
          userName={userName}
          userEmail={userEmail}
          onUpdateProfile={handleUpdateProfile}
          onDeleteAccount={() => {
            // You can change this behavior if needed
            setScreen("auth");
            setProfileData(null);
          }}
          onBack={() => setScreen("dashboard")}                // ✅ GO BACK TO DASHBOARD
        />
      )}
    

      

      
      
    </View>
  );
}








