import React from "react";
import styled from "styled-components/native";
import Votes from "./Votes";
import Poster from "./Poster";

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
`;
export default function VMedia({ posterPath, originalTitle, voteAverage }) {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle?.slice(0, 12)}
        {originalTitle?.length > 12 && "..."}
      </Title>
      <Votes vote={voteAverage} />
    </Movie>
  );
}
