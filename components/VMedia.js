import React from "react";
import styled from "styled-components/native";
import Votes from "./Votes";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Movie = styled.TouchableOpacity`
  align-items: center;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
`;
export default function VMedia({
  id,
  isMovie,
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <Movie onPress={goToDetail}>
      <Poster path={posterPath} />
      <Title>
        {originalTitle?.slice(0, 12)}
        {originalTitle?.length > 12 && "..."}
      </Title>
      <Votes vote={voteAverage} />
    </Movie>
  );
}
