import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { BLACK_COLOR, GRAY_COLOR, YELLOW_COLOR } from "../colors";
import styled from "styled-components/native";

import Detail from "../screens/Detail";

const StyledTouch = styled.TouchableOpacity`
  margin-top: 30px;
`;

// const ScreenOne = ({ navigation: { navigate } }) => (
//   <StyledTouch onPress={() => navigate("ScreenTwo")}>
//     <Text>One. Go To Two</Text>
//   </StyledTouch>
// );
// const ScreenTwo = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate("ScreenThree")}>
//     <Text>Two. Go To Three</Text>
//   </TouchableOpacity>
// );
// const ScreenThree = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
//     <Text>Change Title</Text>
//   </TouchableOpacity>
// );

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        // presentation: "modal",
        // animation: "flip",
        headerTintColor: YELLOW_COLOR,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : GRAY_COLOR },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
      {/* <NativeStack.Screen name="ScreenTwo" component={ScreenTwo} />
      <NativeStack.Screen name="ScreenThree" component={ScreenThree} /> */}
    </NativeStack.Navigator>
  );
}
