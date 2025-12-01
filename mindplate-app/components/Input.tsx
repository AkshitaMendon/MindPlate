import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  leftIcon?: React.ReactNode;
};

const Input: React.FC<Props> = ({ leftIcon, style, ...rest }) => {
  return (
    <View className="flex-row items-center border rounded-xl px-3 py-2 bg-white">
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      <TextInput
        style={style}
        className="flex-1 text-base text-gray-900"
        placeholderTextColor="#9ca3af"
        {...rest}
      />
    </View>
  );
};

export default Input;
