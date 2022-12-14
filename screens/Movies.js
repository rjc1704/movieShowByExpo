import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Votes from "../components/Votes";
import VMedia from "../components/VMedia";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import HMedia from "../components/HMedia";

import { movieApi } from "../api";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const ListContainer = styled.FlatList`
  margin-bottom: 14px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  height: 20px;
`;
const HSeperator = styled.View`
  width: 20px;
`;

export default function Movies({ navigation: { navigate } }) {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movie", "nowPlaying"],
    movieApi.getNowPlaying
  );

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movie", "upcoming"], movieApi.getUpcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movie", "trending"], movieApi.getTrending);

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );

  const keyExtractor = (item) => item.id;

  const isLoading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.refetchQueries(["movie"]);
    setIsRefreshing(false);
  };
  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  return isLoading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            autoplay
            loop
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => {
              return <Slide key={movie.id} movie={movie} />;
            })}
          </Swiper>
          <HList title={"Trending Movies"} data={trendingData.results} />
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.pages.map((page) => page.results).flat()}
      ItemSeparatorComponent={VSeperator}
      keyExtractor={keyExtractor}
      renderItem={renderHMedia}
    />
  );
}
