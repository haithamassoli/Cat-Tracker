import { FlatList } from "react-native";

import CatItem from "./CatItem";

function renderCatItem(itemData) {
  return <CatItem {...itemData.item} />;
}

function CatsList({ cats }) {
  return (
    <FlatList
      data={cats}
      renderItem={renderCatItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CatsList;
