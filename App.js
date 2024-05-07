import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from './screen/CategoriesScreen';
import MealsOverviewScreen from './screen/MealsOverviewScreen';
import MealDetailScreen from './screen/MealDetailScreen';
import FavoriteScreen from './screen/FavoriteScreen';
import FavoritesContextProvider from './store/context/favorites-context'  


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//結合stack跟drawer兩種不同類型navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home"></Ionicons>
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="star"></Ionicons>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}




export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              //screenOptions可以對下面的screen做 default樣式
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <Stack.Screen
              name="Drawer" //引入drawer
              component={DrawerNavigator}
              options={{
                headerShown: false, //把stack的header隱藏
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options={({route, navigation}) => {
              //   //可以像在screen單獨頁面一樣，取得route.params並用來改screen預設的樣式
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   }
              // }}
            ></Stack.Screen>
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
