import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function CatItem({ id, description, amount, date, name }: any) {
  const navigation = useNavigation();

  function catPressHandler() {
    navigation.navigate("ManageCat", {
      catId: id,
    });
  }

  return (
    <Pressable
      onPress={catPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.catItem}>
        <View>
          <Text style={[styles.textBase, styles.name]}>{name}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Breed: {amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default CatItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  catItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
