import { useEffect } from 'react';

//取得parmas變數的第二個做法:
// import {useRoute} from '@react-navigation/native'


import { CATEGORIES, MEALS } from "../data/dummy-data"
import MealsList from '../components/MealsList/MealsList';

export default function MealsOverviewScreen({ route , navigation}) {
  const catId = route.params.categoryId;
  // 再從routes裡面拿params
  // const route = useRoute();
  // 就可以讀取params
  // route.params.屬性...

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >=0;
  });

  //根據catId不同來設置screen樣式
  useEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    //可以像在寫前面screen一樣自訂樣式
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);


  return <MealsList items={displayedMeals}></MealsList>;
}


