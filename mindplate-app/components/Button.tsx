import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: "solid" | "outline";
};

const Button: React.FC<Props> = ({ title, variant = "solid", style, ...rest }) => {
  const base =
    "w-full py-3 rounded-xl items-center justify-center";
  const solid = "bg-blue-500";
  const outline = "border border-blue-500";

  return (
    <TouchableOpacity
      className={`${base} ${variant === "solid" ? solid : outline}`}
      style={style}
      {...rest}
    >
      <Text
        className={
          variant === "solid" ? "text-white font-semibold" : "text-blue-500 font-semibold"
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
