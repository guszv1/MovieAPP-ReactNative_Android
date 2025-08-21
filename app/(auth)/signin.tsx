import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { useAuthContext } from "../../components/AuthProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "../../components/ControlledTextInput";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const { isError, isPending, mutate, error } = useMutation({
    mutationFn: async ({ email, password }: SignInFormValues) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      router.replace("/home");
    },
  });

  const router = useRouter();

  // if (isSignedIn) {
  //   return <Redirect href="/home" />;
  // }

  function handleLogin(values: SignInFormValues) {
    mutate(values);
  }

  return (
    <View className="px-8">
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: () => {
            return (
              <Text className="pt-24 text-5xl pb-4 font-bold">Log in</Text>
            );
          },
          headerStyle: { backgroundColor: "#E0E0E2" },
          headerBackVisible: false,
        }}
      />
      {isPending && <ActivityIndicator size="large" color="#0000ff" />}
      <ControlledTextInput
        label="Your e-mail"
        name="email"
        control={control}
        errors={errors}
      />

      <ControlledTextInput
        label="Your password"
        name="password"
        control={control}
        errors={errors}
        secureTextEntry
      />

      <Link href="/forgot-password" className="text-slate-600 self-end">
        Forgot password?
      </Link>
      <TouchableOpacity
        style={{ backgroundColor: "#3D5CFF" }}
        className="rounded-xl py-4 my-8"
        onPress={handleSubmit(handleLogin)}
      >
        <Text className="text-white text-center text-lg">Log in</Text>
      </TouchableOpacity>
      {isError && (
        <Text className="color-red-500 text-center my-8">
          *{error?.message || "Invalid credentials"}
        </Text>
      )}
      <Text className="text-center color-slate-600">
        Dont't have an account?{" "}
        <Link className="color-blue-600" href="/signup">
          Sign up
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;
