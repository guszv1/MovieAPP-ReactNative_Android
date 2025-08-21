import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SignIn = () => {
  return (
    <View>
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: () => {
            return (
              <Text className="pt-24 text-5xl pb-4 font-bold">Log in</Text>
            );
          },
          headerStyle: { backgroundColor: "#ccc" },
          headerBackVisible: false,
        }}
      />
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;
