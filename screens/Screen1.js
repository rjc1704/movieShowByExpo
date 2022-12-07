import { useCallback, useEffect, useState } from "react";

import { Text, View, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Asset, useAssets } from "expo-asset";

SplashScreen.preventAutoHideAsync();
export default function Screen1() {
  // const [appIsReady, setAppIsReady] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [assets, error] = useAssets([require("../assets/sample.png")]); // 프리로드
  const [fontsLoaded] = useFonts(Entypo.font);

  if (!setIsAppReady) {
    return null;
  }

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
      setIsAppReady(true);
    };
    if (assets && fontsLoaded) {
      prepare();
    }
  }, [assets, fontsLoaded]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
      <Image source={assets ? assets[0] : require("../assets/icon.png")} />
    </View>
  );
}
