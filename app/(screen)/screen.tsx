import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

const Screen = () => {
  return (
    <View>
      <Text>Screen</Text>
      <Link href={"/"}>Home</Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default Screen;
