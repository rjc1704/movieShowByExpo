import React from "react";
import styled from "styled-components/native";
const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;
const Text = styled(Overview)`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

export default function Votes({ vote }) {
  return <Text>⭐️ {vote}/10</Text>;
}
