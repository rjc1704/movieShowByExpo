import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { View, Text, useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, PURPLE_COLOR, GRAY_COLOR } from "../colors";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Stack from "./Stack";
const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        // unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : PURPLE_COLOR,
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : GRAY_COLOR },
        headerTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
      }}
    >
      <Tab.Screen
        options={{
          tabBarBadge: "wow",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons name="local-movies" size={size} color={color} />
            );
          },
        }}
        name="Movies"
        component={Movies}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="tv" size={size} color={color} />
          ),
        }}
        name="Tv"
        component={Tv}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" size={size} color={color} />;
          },
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
}
