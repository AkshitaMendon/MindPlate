import React from "react";
import { View, ViewProps } from "react-native";

const Card: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <View
      className="bg-white rounded-2xl p-4 shadow-md"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Card;
