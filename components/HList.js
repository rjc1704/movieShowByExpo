import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const HSeperator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 14px;
`;
export default function HList({ title, data, loadMore }) {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        horizontal
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={HSeperator}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name || item.original_title}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
}
