import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MultipleChoice from "./components/Quizzes/MultipleChoice";
import Ionicons from "react-native-vector-icons/Ionicons";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "profile") {
            iconName = "person";
          } else if (route.name === "quiz") {
            iconName = "list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="home" component={LoginPage} />
      <Tab.Screen name="profile" component={ProfilePage} />
      <Tab.Screen name="quiz" component={MultipleChoice} />
    </Tab.Navigator>
  );
}
