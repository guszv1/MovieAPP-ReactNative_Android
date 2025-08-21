import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Title from "../components/Title";

const Index = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-12">
      <Text className="mb-6 color-slate-500 self-end">Skip</Text>
      <Image source={require("../assets/images/illustration-1.png")} />
      <Title text="Numerous free trial courses" />
      <Text className="text-2xl color-slate-500 text-center mb-4">
        Free courses for you to find your way to learning
      </Text>
      <View className="flex-row gap-x-4 mt-8">
        <TouchableOpacity
          className="bg-blue-600 px-12 py-4 rounded-2xl"
          onPress={() => router.navigate("/signup")}
        >
          <Text className="text-white text-xl text-center">Sign Up</Text>
        </TouchableOpacity>
        <Link href="/signin" asChild>
          <TouchableOpacity className="border border-blue-600 px-12 py-4 rounded-2xl">
            <Text className="color-blue-600 text-xl text-center">Log in</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Index;
