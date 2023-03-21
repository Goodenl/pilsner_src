const findMeal = (state, title) => {
  return state.mealList.find((meal) => meal.title == title);
};

export default {
  state: {
    mealList: [],
  },
  getters: {
    getMealList: (state) => {
      return state.mealList;
    },
    getTotalPrice: (state) => {
      let totalPrice = 0
      for (const meal of state.mealList) {
        totalPrice += meal.price * meal.quantity
      }
      return totalPrice;
    },
  },
  mutations: {
    addMealList: (state, meal) => {
      const foundMeal = findMeal(state, meal.title);
      if (!foundMeal) {
        if (meal.count) {
          meal.quantity = meal.count;
        } else {
          meal.quantity = 1;
        }

        state.mealList.push(meal);
      } else {
        meal?.count ? (foundMeal.quantity += meal.count) : foundMeal.quantity++;
      }
    },
    removeMealList: (state, meal) => {
      state.mealList.splice(state.mealList.indexOf(meal), 1);
      meal.quantity = 0;
    },
    toDoQuantity: (state, { title, toDo, amount }) => {
      const foundMeal = findMeal(state, title);
      if (toDo.toLowerCase().trim() == "plus") {
        foundMeal.quantity += amount;
      } else if (
        toDo.toLowerCase().trim() == "minus" &&
        foundMeal.quantity > 1
      ) {
        foundMeal.quantity -= amount;
      }
    },
  },
  // actions: {

  // }
};
