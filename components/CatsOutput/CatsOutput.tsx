import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import CatsList from "./CatsList";
import CatsSummary from "./CatsSummary";

function CatsOutput({ cats, catsPeriod, fallbackText }: any) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (cats.length > 0) {
    content = <CatsList cats={cats} />;
  }

  return (
    <View style={styles.container}>
      <CatsSummary cats={cats} periodName={catsPeriod} />
      {content}
    </View>
  );
}

export default CatsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
