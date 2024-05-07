import { FlatList } from "react-native"

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";


export default function CategoriesScreen({navigation}) {

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id, //這個可以做為params傳給 MealsOverview這個components
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      ></CategoryGridTile>
    );
  }

  return (
  <FlatList 
    data={CATEGORIES} 
    keyExtractor={(item) => item.id} 
    renderItem={renderCategoryItem}
    numColumns={2}
  ></FlatList>)
}
