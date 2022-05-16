import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ManageCat from "./screens/ManageCat";
import RecentCats from "./screens/RecentCats";
import AllCats from "./screens/AllCats";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import CatsContextProvider from "./store/cats-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function CatsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageCat");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentCats"
        component={RecentCats}
        options={{
          title: "Recent Cats",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllCats"
        component={AllCats}
        options={{
          title: "All Cats",
          tabBarLabel: "All Cats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <CatsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="CatsOverview"
              component={CatsOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageCat"
              component={ManageCat}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CatsContextProvider>
    </>
  );
}
