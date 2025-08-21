import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const ScreenLayout = () => {
  return (
    <View>
      <Text>ScreenLayout</Text>
      <Slot />
    </View>
  );
};

export default ScreenLayout;
