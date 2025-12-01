// "use client"

// import { useState } from "react";
// import ProfileSetup1 from "./ProfileSetup1";
// import ProfileSetup2 from "./ProfileSetup2";

// export type ProfileSetupScreen = "step1" | "step2";

// export interface ProfileSetupNavigationProps {
//   navigate: (screen: ProfileSetupScreen, data?: any) => void;
//   onComplete?: (profileData: any) => void;
// }

// interface Props {
//   onComplete?: (profileData: any) => void;
// }

// export default function ProfileSetupNavigator({ onComplete }: Props) {
//   const [currentScreen, setCurrentScreen] = useState<ProfileSetupScreen>("step1");
//   const [collectedData, setCollectedData] = useState<any>(null);

//   const navigation: ProfileSetupNavigationProps = {
//     navigate: (screen: ProfileSetupScreen, data?: any) => {
//       if (data) {
//         setCollectedData(data);
//       }
//       setCurrentScreen(screen);
//     },
//     onComplete,
//   };

//   if (currentScreen === "step1") {
//     return <ProfileSetup1 navigation={navigation} />;
//   }

//   return (
//     <ProfileSetup2
//       navigation={navigation}
//       profileData={collectedData}
//     />
//   );
// }

"use client";

import { useState } from "react";
import ProfileSetup1 from "./ProfileSetup1";
import ProfileSetup2 from "./ProfileSetup2";

interface Props {
  onComplete: (data: any) => void;
}

export default function ProfileSetupNavigator({ onComplete }: Props) {
  const [screen, setScreen] = useState("step1");

  // store step1 values
  const [step1Data, setStep1Data] = useState<any>(null);

  return screen === "step1" ? (
    <ProfileSetup1
      onNext={(data) => {
        setStep1Data(data);
        setScreen("step2");
      }}
    />
  ) : (
    <ProfileSetup2
      step1Data={step1Data}
      onFinish={(finalData) => onComplete(finalData)}
    />
  );
}
