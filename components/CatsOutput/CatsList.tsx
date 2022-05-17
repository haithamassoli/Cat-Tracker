import { FlatList } from "react-native";

import CatItem from "./CatItem";

function renderCatItem(itemData: any) {
  return <CatItem {...itemData.item} />;
}

function CatsList({ cats }: any) {
  return (
    <FlatList
      data={cats}
      renderItem={renderCatItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CatsList;
