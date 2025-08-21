import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Tabs } from "expo-router";
import { AuthContext } from "../../components/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const TabsLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    console.log("Checking auth state");
    onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed", !!!user);
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  // const { isSignedIn } = useContext(AuthContext);

  if (!isSignedIn) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  );
};

export default TabsLayout;
