import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../util";
const Image = styled.Image`
  width: 100px;
  height: 140px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export default function Poster({ path }) {
  return <Image source={{ uri: makeImgPath(path) }} />;
}
