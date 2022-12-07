import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../util";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Votes from "./Votes";
import Poster from "./Poster";

const MovieImg = styled.Image``;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;
const View = styled.View`
  flex: 1;
`;

// const Votes = styled(Overview)`
//   margin-top: 10px;
//   font-size: 12px;
//   color: rgba(255, 255, 255, 0.8);
// `;

export default function Slide({ movie }) {
  const isDark = useColorScheme() === "dark";
  return (
    <View>
      <MovieImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(movie.backdrop_path) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
        intensity={50}
      >
        <Wrapper>
          <Poster path={movie.poster_path} />
          <Column>
            <Title>{movie.original_title}</Title>
            <Votes vote={movie.vote_average} />
            <Overview>{movie.overview.slice(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
}
