import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/components/BottomNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
