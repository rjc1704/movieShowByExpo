import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0 30px;
  /* padding-right: 30px; */
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.3);
  margin-top: 5px;
  padding-right: 15px;
  width: 90%;
`;

const Release = styled.Text`
  color: white;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
`;

export default function HMedia({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
}) {
  return (
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title>{originalTitle}</Title>
        <Release>
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </Release>
        <Overview>
          {overview?.slice(0, 100)}
          {overview?.length > 100 && "..."}
        </Overview>
      </HColumn>
    </HMovie>
  );
}
