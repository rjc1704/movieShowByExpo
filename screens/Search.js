import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useQueries, useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

export default function Search() {
  const [query, setQuery] = useState("");
  const {
    isLoading: isLoadingMovie,
    data: movieData,
    refetch: searchMovies,
  } = useQuery(["searchMovie", query], movieApi.search, {
    enabled: false,
  });

  const {
    isLoading: isLoadingTv,
    data: TvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text) => setQuery(text);
  const onSubmit = async () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        value={query}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        returnKeyType="search"
        placeholderTextColor="grey"
        placeholder="Search for Movie or TV Show"
      />
      {(isLoadingMovie || isLoadingTv) && <Loader />}
      {movieData && <HList title="Movies" data={movieData.results} />}
      {TvData && <HList title="TV Shows" data={TvData.results} />}
    </Container>
  );
}
