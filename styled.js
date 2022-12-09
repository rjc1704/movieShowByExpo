import { Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const lightTheme = {
  mainBgColor: "white",
  textColor: "#1e272e",
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
export const darkTheme = {
  mainBgColor: "#1e272e",
  textColor: "#d2dae2",
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
