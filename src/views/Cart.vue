<template>
  <section class="menu-sheets section">
    <v-header />

    <main class="cart">
      <div class="container" v-if="mealList.length">
        <ul class="cart__list">
          <li v-for="meal in mealList" :key="meal.title" class="cart__item">
            <div class="cart__title">
              <h3>{{ meal.title }}</h3>
              <p class="cart__quantity text-med-norm text-primary-light">{{ meal.quantity }}</p>
            </div>
            <span class="cart__price">{{ +(meal.price.toString().slice(0, -1)) * meal.quantity }} €</span>
          </li>
        </ul>

        <div class="position-menu__footer">
          <div class="position-menu__total-price">
            <div class="position-menu__name">
              <span class="text-big-bold">Total price:</span>
            </div>
            <h3 class="text-accent text-accent-childs">
              {{totalPrice.toString().slice(0, -1)}}
              <span class="currency">€</span>
            </h3>
          </div>

          <div class="position-menu__footer-action">
            <c-button class="btn" @click="makeOrder">Order</c-button>
          </div>
        </div>
      </div>
      <div class="cart__empty" v-else>
        <h3 >Your cart is empty</h3>
      </div>
    </main>
    
    <footer>
      <nav-bar />
    </footer>

    <popup class="popup--energy" ref="energyPopup">
      <template v-slot:main>
        <h2 class="text-tabs-active"
          >Virtual Order</h2
        >
      </template>
      <template v-slot:footer="{ confirm }">
        <span class="text-big-norm popup-marker__list">You are placing a virtual order.<br>We cannot place a real order right now because this is a demo for the portfolio</span>

        <button @click="confirm" class="btn btn--primary">Got it</button>
      </template>
    </popup>
  </section>
</template>

<script>
import VHeader from "@/components/VHeader.vue"
import NavBar from "@/components/NavBar.vue"
import Popup from "@/components/Popup.vue";

export default {
  components: {
    VHeader,
    NavBar,
    Popup
  },

  computed: {
    mealList() {
      return this.$store.getters.getMealList
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice
    }
  },

  methods: {
    async makeOrder() {
      const respone = await this.$refs.energyPopup.open();
    },
  }
}
</script>