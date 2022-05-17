import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { catObjType } from "../../types/types";

type Props = {
  cats: catObjType[];
  periodName: string;
};

function CatsSummary({ cats, periodName }: Props) {
  const catsSum = cats.reduce((sum: number, cat: catObjType) => {
    return sum + cat.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{catsSum}</Text>
    </View>
  );
}

export default CatsSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
