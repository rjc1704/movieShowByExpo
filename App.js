// import React from "react";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Screen1 from "./screens/Screen1";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";

// Keep the splash screen visible while we fetch resources

// const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {/* <Stack /> */}
          {/* <Tabs /> */}
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
