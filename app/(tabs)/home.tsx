import { Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../components/AuthProvider";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const { signOut, userName } = useAuthContext();

  function handleSignOut() {
    signOut();
    router.replace("/signin");
  }

  return (
    <SafeAreaView className="p-4">
      <Text>Olá {userName}!</Text>
      <Text>Home</Text>
      <Button title="Sign out" onPress={handleSignOut} />
      <Text>Welcome to the Home screen!</Text>
      <Text>Here you can find various features and options.</Text>
      <Text>Explore the app and enjoy your experience!</Text>
      <Text>Feel free to customize this screen as per your needs.</Text>
      <Text>Have a great day!</Text>
      <Text>Don't forget to check out other sections of the app.</Text>
      <Text>Thank you for using our application!</Text>
      <Text>We appreciate your feedback and suggestions.</Text>
      <Text>Stay tuned for more updates and features.</Text>
      <Text>Happy exploring!</Text>
      <Text>Contact us if you have any questions or concerns.</Text>
      <Text>We are here to help you!</Text>
      <Text>Enjoy your time on the app!</Text>
      <Text>Take care and see you soon!</Text>
      <Text>Goodbye for now!</Text>
      <Text>Stay safe and healthy!</Text>
    </SafeAreaView>
  );
};

export default Home;
