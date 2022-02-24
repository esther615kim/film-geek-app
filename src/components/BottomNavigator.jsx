import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import SingleMoviePage from './../pages/SingleMoviePage';
import HomePage from './../pages/HomePage';
import LoginPage from './../pages/LoginPage';
import ProfilePage from './../pages/ProfilePage';

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
          }else if (route.name === "movie") {
            iconName = "film";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
       <Tab.Screen name="home" component={LoginPage} />
      <Tab.Screen name="movie" component={SingleMoviePage} />
      <Tab.Screen name="profile" component={ProfilePage} />
      {/* <Tab.Screen name="quiz" component={MultipleChoice} /> */}
    </Tab.Navigator>
  );
}
