// import React from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HSeperator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

export default function Tv() {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingToday,
    data: todayData,
    isRefetching: isRefetchingToday,
  } = useQuery(["tv", "today"], tvApi.getAiringToday);
  const {
    isLoading: isLoadingTop,
    data: topData,
    isRefetching: isRefetchingTop,
  } = useQuery(["tv", "top"], tvApi.getTopRated);
  const {
    isLoading: isLoadingTrending,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["tv", "trending"], tvApi.getTrending);
  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };
  const refreshing =
    isRefetchingToday || isRefetchingTop || isRefetchingTrending;

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
      <HList title={"Airing Today"} data={todayData.results} />
      <HList title={"Top TV"} data={topData.results} />
    </ScrollView>
  );
}
