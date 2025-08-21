import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { InferType, object, string } from "yup";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useMutation } from "@tanstack/react-query";

const userSchema = object({
  name: string().required("Name is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type SignUpFormValues = InferType<typeof userSchema>;

const SignUp = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (user: SignUpFormValues) => {
      const { name, email, password } = user;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    },
    onSuccess: (_data) => {
      router.replace("/home");
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  async function handleSignUp(values: SignUpFormValues) {
    mutation.mutate(values);
  }

  return (
    <View className="px-8">
      {mutation.isPending && <ActivityIndicator size="large" color="#0000ff" />}
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: () => {
            return (
              <Text className="pt-24 text-5xl pb-4 font-bold">Sign up</Text>
            );
          },
          headerStyle: { backgroundColor: "#E0E0E2" },
          headerBackVisible: false,
        }}
      />
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={userSchema}
        onSubmit={handleSignUp}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <View>
            <Text className="mt-12 color-slate-600">Your Name</Text>
            <TextInput
              value={values.name}
              onChangeText={handleChange("name")}
              className="px-4 py-4 rounded-xl border border-slate-400"
            />
            {errors.name && (
              <Text className="color-red-500">*{errors.name}</Text>
            )}
            <Text className="mt-4 color-slate-600">Your Email</Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              className="px-4 py-4 rounded-xl border border-slate-400"
            />
            {errors.email && (
              <Text className="color-red-500">*{errors.email}</Text>
            )}

            <Text className="mt-2 color-slate-600">Password</Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry
              className="px-4 py-4 rounded-xl border border-slate-400"
            />
            {errors.password && (
              <Text className="color-red-500">*{errors.password}</Text>
            )}
            <TouchableOpacity
              style={{ backgroundColor: "#3D5CFF" }}
              className="rounded-xl py-4 my-8"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white text-center text-lg">
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {mutation.isError && (
        <Text className="text-center color-red-500">
          *{mutation.error.message}
        </Text>
      )}
      <Text className="text-center color-slate-600 my-8">
        Already have an account?{" "}
        <Link className="color-blue-600" href="/signin">
          Log in
        </Link>
      </Text>
    </View>
  );
};

export default SignUp;
