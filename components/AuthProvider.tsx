import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  addUser: (user: User) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  userName: string;
  isSignedIn: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const signIn = (email: string, password: string) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setUserName(user.name);
      setIsSignedIn(true);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUserName("");
    setIsSignedIn(false);
  };

  useEffect(() => {
    // Load users from AsyncStorage when the component mounts
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.error("Error loading users from AsyncStorage:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    // Save users to AsyncStorage whenever the users state changes
    const saveUsers = async () => {
      try {
        await AsyncStorage.setItem("users", JSON.stringify(users));
        console.log("Users saved to AsyncStorage:", users);
      } catch (error) {
        console.error("Error saving users to AsyncStorage:", error);
      }
    };

    saveUsers();
  }, [users]);

  const currentValue = { addUser, signIn, signOut, userName, isSignedIn };

  return (
    <AuthContext.Provider value={currentValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
