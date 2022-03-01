import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import MultipleChoice from "./Quizzes/MultipleChoice";
import MoviesPage from "../pages/MoviesPage";
import MovieModal from "../pages/MovieModal";
import ChatPage from "../pages/ChatPage";

import { useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
const RootStack = createStackNavigator();

export const StackNavigator = () => {

const [loggedIn, setLoggedIn] = useState(false);
const userinfo = useSelector((state) => state.userInfo); // REDUX

useEffect(()=>{
  setLoggedIn(userinfo.isLoggedin);
},[userinfo])


  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Landing"
          component={loggedIn ? MoviesPage : LoginPage}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="View Movie" component={MovieModal} />
        {/* <RootStack.Screen name="Add Comment" component={CommentModal} /> */}
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Sign Up" component={SignUpPage} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Quiz") {
            iconName = "list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="Home" component={StackNavigator}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Quiz" component={MultipleChoice} />
      <Tab.Screen name="Chat" component={ChatPage} />
    </Tab.Navigator>
  );
}
