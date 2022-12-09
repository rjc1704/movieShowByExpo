import React, { useEffect } from "react";
import {
  Linking,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../util";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import Loader from "../components/Loader";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  justify-content: flex-end;
  padding: 0 20px;
  height: ${(props) => props.theme.SCREEN_HEIGHT / 4}px;
`;
const Background = styled.Image``;

const Column = styled.View`
  /* flex: 1; */
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 25px;
  align-self: flex-end;
  width: 70%;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
  padding: 0 20px;
`;

const VideoBtn = styled.TouchableOpacity`
  padding: 0 20px;
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 5px;
  line-height: 24px;
`;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}) {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movie" : "tv", params.id],
    isMovie ? movieApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    const isAndroid = Platform.OS === "android";
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        // title: "original_title" in params ? "Movie" : "TV",
      });
    } else {
      await Share.share({
        url: homepage,
        title: "original_title" in params ? "Movie" : "TV",
      });
    }
  };
  const ShareBtn = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  const openYoutube = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    await Linking.openURL(baseUrl);
    // await WebBrowser.openBrowserAsync(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareBtn />,
      });
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      {isLoading && <Loader />}
      {data?.videos?.results?.map((video) => (
        <VideoBtn key={video.key} onPress={() => openYoutube(video.key)}>
          <AntDesign name="youtube" size={24} color="white" />
          <BtnText>{video.name}</BtnText>
        </VideoBtn>
      ))}
    </Container>
  );
}
