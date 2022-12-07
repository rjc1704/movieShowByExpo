import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  /* background-color: ${(props) => props.theme.mainBgColor}; */
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
