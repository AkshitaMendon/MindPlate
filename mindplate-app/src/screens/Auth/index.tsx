import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import VerifyOTPScreen from "./VerifyOTPScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

export type AuthScreen =
  "login" |
  "signup" |
  "forgot" |
  "verify" |
  "reset";

interface Props {
  onAuthResult: (next: "profile" | "dashboard", name: string, email: string) => void;
}

export default function AuthNavigator({ onAuthResult }: Props) {
  const [screen, setScreen] = useState<AuthScreen>("login");
  const [tempEmail, setTempEmail] = useState("");

  // 🔥 LOGIC FLOW:
  // forgot → verify → reset → login

  if (screen === "forgot") {
    return (
      <ForgotPasswordScreen
        onSend={(email:string) => {
          setTempEmail(email);
          setScreen("verify");
        }}
        goBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "verify") {
    return (
      <VerifyOTPScreen
        email={tempEmail}
        onVerified={() => setScreen("reset")}
        goBack={() => setScreen("forgot")}
      />
    );
  }

  if (screen === "reset") {
    return (
      <ResetPasswordScreen
        email={tempEmail}
        onResetDone={() => setScreen("login")}
        goBack={() => setScreen("verify")}
      />
    );
  }

  return screen === "login" ? (
    <LoginScreen
      goToSignup={() => setScreen("signup")}
      goToForgot={() => setScreen("forgot")}
      onLoginSuccess={({ has_profile, name, email }) => {
        onAuthResult(has_profile ? "dashboard" : "profile", name, email);
      }}
    />
  ) : (
    <SignupScreen
      navigation={{ navigate: (s) => setScreen(s) }}
      onSignupSuccess={(n, e) => onAuthResult("profile", n, e)}
    />
  );
}


// import React, { useState } from "react";
// import LoginScreen from "./LoginScreen";
// import SignupScreen from "./SignupScreen";
// import ForgotPasswordScreen from "./ForgotPasswordScreen";
// import VerifyOTPScreen from "./VerifyOTPScreen";
// import ResetPasswordScreen from "./ResetPasswordScreen";

// export type AuthScreen = "login" | "signup" | "forgot" | "verifyOTP" | "resetPassword";

// interface Props {
//   // onAuthResult: (next: "profile" | "dashboard") => void;
//   onAuthResult: (next: "profile" | "dashboard", name: string, email: string) => void;
// }
// export default function AuthNavigator({ onAuthResult }: Props) {
//   const [screen, setScreen] = useState<AuthScreen>("login");

//   if (screen === "login") {
//     return (
//       <LoginScreen
//         goToSignup={() => setScreen("signup")}
//         goToForgot={() => setScreen("forgot")}
//         onLoginSuccess={({ has_profile, name, email }) => {
//           onAuthResult(has_profile ? "dashboard" : "profile", name, email);
//         }}
//       />
//     );
//   }

//   if (screen === "signup") {
//     return (
//       <SignupScreen
//         navigation={{ navigate: (s) => setScreen(s) }}
//         onSignupSuccess={(name, email) => onAuthResult("profile", name, email)}
//       />
//     );
//   }
//   if(screen=="forgot")
//     return <ForgotPasswordScreen navigation={{navigate:setScreen}}/>

//   if (screen=="verifyOTP")
//     return<VerifyOTPScreen navigation={{navigate:setScreen}} route={{params:tempParams}}/>;

//   if (screen === "resetPassword")
//   return <ResetPasswordScreen navigation={{ navigate: setScreen }} route={{ params: tempParams }} />;
// }

// export default function AuthNavigator({ onAuthResult }: Props) {
//   const [screen, setScreen] = useState<AuthScreen>("login");

//   return screen === "login" ? (
//     <LoginScreen
//       goToSignup={() => setScreen("signup")}
//       onLoginSuccess={({ has_profile, name, email }) => {
//         onAuthResult(has_profile ? "dashboard" : "profile", name, email);
//     }}
//       // onLoginSuccess={({ has_profile }) => {
//       //   if (has_profile) onAuthResult("dashboard");
//       //   else onAuthResult("profile");
//       // }}
//     />
//   ) : (
//     <SignupScreen
//       navigation={{
//         navigate: (s) => setScreen(s),
//       }}
//       onSignupSuccess={(name, email)=>
//         onAuthResult("profile", name, email)
//       }
//     />
//   );
// }
