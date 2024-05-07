import { useContext, useLayoutEffect } from "react";
import { View,Text, Image, StyleSheet, ScrollView} from "react-native"

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";


export default function MealDetailScreen({route , navigation}) {
  const favoriteMealsCtx = useContext(FavoritesContext);//引入別地方的初始context(state)，接著進行操作

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  //useContext代表的就是接收state，所以可以直接操作
  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);




  function changeFavoriteStatusHandler() {
    if(mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId)
    }
    
  }

  //如果option內的東西(比如這個headerRight內的內容)要跟這個頁面做交互，就可以用useLayoutEffect跟navigation做
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          ></IconButton>
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image
        style={styles.image}
        source={{ uri: selectedMeal.imageUrl }}
      ></Image>
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      ></MealDetails>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients}></List>
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps}></List>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 24
  },  
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: 'center'
  }
});