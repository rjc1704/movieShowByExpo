import { useState } from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HSeperator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

export default function Tv() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingToday,
    data: todayData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["tv", "today"], tvApi.getAiringToday, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const { isLoading: isLoadingTop, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.getTopRated
  );

  const { isLoading: isLoadingTrending, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.getTrending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const isLoading = isLoadingToday || isLoadingTop || isLoadingTrending;
  if (isLoading) return <Loader />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title={"Trending TV"} data={trendingData.results} />
      <HList
        title={"Airing Today"}
        data={todayData?.pages?.map((page) => page.results).flat()}
        loadMore={loadMore}
      />
      <HList title={"Top TV"} data={topData.results} />
    </ScrollView>
  );
}
