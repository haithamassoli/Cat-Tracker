import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import CatForm from "../components/ManageCat/CatForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { CatsContext } from "../store/cats-context";
import { storeCat, updateCat, deleteCat } from "../util/http";

// type props =

function ManageCat({ route, navigation }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const catsCtx = useContext(CatsContext);

  const editedCatId = route.params?.catId;
  const isEditing = !!editedCatId;

  const selectedCat = catsCtx.cats.find((cat: any) => cat.id === editedCatId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Cat" : "Add Cat",
    });
  }, [navigation, isEditing]);

  async function deleteCatHandler() {
    setIsSubmitting(true);
    try {
      await deleteCat(editedCatId);
      catsCtx.deleteCat(editedCatId);
      navigation.goBack();
    } catch (error: any) {
      setError("Could not delete cat - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(catData: any) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        catsCtx.updateCat(editedCatId, catData);
        await updateCat(editedCatId, catData);
      } else {
        const id = await storeCat(catData);
        catsCtx.addCat({ ...catData, id: id });
      }
      navigation.goBack();
    } catch (error: any) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <CatForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedCat}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteCatHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
