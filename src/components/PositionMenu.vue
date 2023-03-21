<template>
  <section class="position-menu section">
    <header class="position-menu__header">
      <img
        ref="positionImage"
        :src="item.image || $getURL('/img/picture/no-photo.png')"
        alt=""
        class="position-menu__img"
      />

      <div class="position-menu__actions header--ios container">
        <button @click="close" class="btn--circle btn--white">
          <img src="@/assets/image/icons/drop-arrow.svg" alt="" />
        </button>

        <button class="btn--circle btn--white">
          <svg>
            <use :xlink:href="$getURL('/pwa/icons/nav-pack.svg#cart')" />
          </svg>
        </button>
      </div>

      <span class="position-menu__promo-text">Promo</span>

      <ul
        @click="markerPopupHandle"
        class="menu-card__icons-list menu-card__icons-list--position"
      >
        <li class="menu-card__icons-item menu-card__icons-item--position">
          <img src="@/assets/image/icons/spicy.svg" alt="" />
        </li>
        <li class="menu-card__icons-item menu-card__icons-item--position">
          <img src="@/assets/image/icons/vegan.svg" alt="" />
        </li>
        <li class="menu-card__icons-item menu-card__icons-item--position">
          <img src="@/assets/image/icons/vegan.svg" alt="" />
        </li>
      </ul>
    </header>

    <main class="position-menu__main container">
      <span class="text-big-norm text-grey">Art. 157890</span>

      <div class="position-menu__title">
        <h2>{{ item.title || "Name of Dish" }}</h2>
        <svg @click="energyPopupHandle" class="position-menu__title-info">
          <use :xlink:href="$getURL('/pwa/icons/nav-pack.svg#info')" />
        </svg>
      </div>

      <p class="text-big-norm">
        {{ mealDescription }}
      </p>

      <button
        @click="toggleDescription"
        :class="{
          'btn--clear text-accent-childs position-menu__read-more': true,
          'position-menu__read-more--opened': this.fullDescription,
        }"
      >
        <span>
          {{ !fullDescription ? "More" : "Close" }}
        </span>
        <svg
          width="6"
          height="3"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="#47474A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <radio-picker
        v-for="radioPicker in radioPickerList"
        :key="radioPicker.title"
        :name="radioPicker.name"
        v-model="radioPicker.selected"
        :childs="radioPicker.childs"
      >
        <template #title>
          {{ radioPicker.title }}
        </template>

        <template v-slot:default="{ child }">
          <div
            :class="{
              picker__between: true,
              'picker--selected': radioPicker.selected == child.title,
            }"
          >
            <p class="text-big-norm">{{ child.title }}</p>
            <span class="text-big-bold">
              +{{ child.price }}
              <span class="text-big-middle">€</span>
            </span>
          </div>
        </template>
      </radio-picker>

      <checkbox-picker :childs="checkboxPicker.childs">
        <template #title>
          {{ checkboxPicker.title }}
        </template>

        <template v-slot:default="{ child }">
          <div
            :class="{
              'picker__checkbox-content': true,
              'picker--selected': child.selected,
            }"
          >
            <p class="text-big-norm">{{ child.title }}</p>

            <span class="text-big-bold">
              +{{ child.price * child.quantity || child.price }}
              <span class="text-big-middle">€</span>
            </span>

            <div
              v-show="child.selected"
              class="menu-card__quantity menu-card__quantity--position-menu"
            >
              <c-button
                @click="changeQuantity(child, 'minus')"
                class="btn btn--outline"
                >-</c-button
              >
              <span class="menu-card__quantity-count">{{
                child.quantity
              }}</span>
              <c-button
                @click="changeQuantity(child, 'plus')"
                class="btn btn--outline"
                >+</c-button
              >
            </div>
          </div>
        </template>
      </checkbox-picker>
    </main>

    <footer class="position-menu__footer">
      <div class="position-menu__total-price">
        <div class="position-menu__name">
          <span class="text-big-bold">WOK</span>
          <span class="text-big-middle text-grey">450 g</span>
        </div>
        <h3 class="text-accent text-accent-childs">
          +{{ (item.price * item.count).toString().slice(0, -1) }}
          <span class="currency">€</span>
        </h3>
      </div>
      <p class="text-med-norm text-grey">Rise noodles, shrimps, chicken</p>

      <div class="position-menu__footer-action">
        <div class="menu-card__quantity menu-card__quantity--position-menu">
          <c-button
            @click="changeQuantity(item, 'minus', true)"
            class="btn btn--outline-grey"
            :blocked="item.count == 1"
          >
            -
          </c-button>

          <span class="text-big-bold">{{ item.count }}</span>

          <c-button
            @click="changeQuantity(item, 'plus', true)"
            class="btn btn--outline-grey"
          >
            +
          </c-button>
        </div>

        <c-button class="btn" @click="addToCart">Add</c-button>
      </div>
    </footer>

    <popup class="popup--marker" ref="markerPopup">
      <template v-slot:main>
        <span class="text-tabs-active">Marking of the dish</span>
      </template>
      <template v-slot:footer="{ confirm }">
        <ul class="popup-marker__list">
          <li
            v-for="marker in markerList"
            :key="marker.title"
            class="popup-marker__item"
          >
            <svg class="popup-marker__icon">
              <use
                :xlink:href="
                  $getURL(`/pwa/icons/marker-pack.svg#${marker.svgId}`)
                "
              />
            </svg>
            <span class="text-big-norm">{{ marker.title }}</span>
          </li>
        </ul>

        <button @click="confirm" class="btn btn--primary">Got it</button>
      </template>
    </popup>

    <popup class="popup--energy" ref="energyPopup">
      <template v-slot:main>
        <span class="text-tabs-active"
          >Nutritional value of the dish per 100 g.</span
        >
      </template>
      <template v-slot:footer="{ confirm }">
        <ul class="popup-marker__list">
          <li
            v-for="(energyValue, index) in energyValues"
            :key="energyValue.title"
            class="popup-marker__item"
          >
            <span :class="[index == 0 ? 'text-big-bold' : 'text-big-norm']">{{
              energyValue.title
            }}</span>
            <span class="text-big-bold">{{ energyValue.value }}</span>
          </li>
          <li class="popup-marker__item popup-marker__item--weight">
            <span class="text-big-norm">Weight</span>
            <span class="text-big-bold">{{ item.weight }}</span>
          </li>
        </ul>

        <button @click="confirm" class="btn btn--primary">Got it</button>
      </template>
    </popup>
  </section>
</template>

<script>
import RadioPicker from "@/components/RadioPicker.vue";
import CheckboxPicker from "@/components/CheckboxPicker.vue";
import Popup from "@/components/Popup.vue";

export default {
  name: "PositionMenu",

  components: {
    RadioPicker,
    CheckboxPicker,
    Popup,
  },

  props: {
    item: Object,
    close: Function,
  },

  preventQuantity: undefined,

  data() {
    return {
      meal: {
        name: "",
        price: 75,
        quantity: 1,
      },

      fullDescription: false,

      radioPickerList: [
        {
          title: "Basis of choice",
          name: "main",
          selected: "Rice",
          childs: [
            {
              title: "Rice",
              price: "0",
            },
            {
              title: "rice noodles",
              price: "0",
            },
            {
              title: "wheat noodles",
              price: "0",
            },
          ],
        },
        {
          title: "Filling of your choice",
          name: "inner",
          selected: "Chicken",
          childs: [
            {
              title: "Chicken",
              price: "5",
            },
            {
              title: "Pork",
              price: "7",
            },
            {
              title: "Beef",
              price: "10",
            },
            {
              title: "Shrimps",
              price: "15",
            },
            {
              title: "Vegetables",
              price: "0",
            },
          ],
        },
      ],

      checkboxPicker: {
        title: "Additional ingredients to choose from",
        childs: [
          {
            title: "Chicken",
            selected: false,
            quantity: 0,
            price: "10",
          },
          {
            title: "Pork",
            selected: false,
            quantity: 0,
            price: "7",
          },
          {
            title: "Beef",
            selected: false,
            quantity: 0,
            price: "10",
          },
          {
            title: "Shrimps",
            selected: false,
            quantity: 0,
            price: "15",
          },
        ],
      },

      markerList: [
        {
          svgId: "vegan",
          title: "vegan dish, no animal oil added",
        },
        {
          svgId: "spicy",
          title: "spicy dish",
        },
        {
          svgId: "kosh",
          title: "kosher dish",
        },
        {
          svgId: "halal",
          title: "halal dish",
        },
      ],

      energyValues: [
        {
          title: "Energy ",
          value: "256.8 kcal",
        },
        {
          title: "Squirrels",
          value: "10.7g",
        },
        {
          title: "Fats",
          value: "8.4g",
        },
        {
          title: "Carbohydrates",
          value: "33g",
        },
      ],
    };
  },

  computed: {
    mealDescription() {
      const minDescription = this.item.description
        ?.split(/\s+/)
        .splice(0, 5)
        .toString();
      //.replaceAll(/(?<!\s)\,(?<!\s)/gm)
      return !this.fullDescription
        ? minDescription?.slice(0, -1) + "..."
        : this.item?.description;
    },

    radioPickerSelected() {
      let selectedChild = [];

      this.radioPickerList.forEach((radioPicker) => {
        const foundChild = radioPicker.childs.find(
          (radioChild) => radioChild.title === radioPicker.selected
        );
        selectedChild.push(foundChild);
      });

      return selectedChild;
    },
    checkboxPickerSelected() {
      return this.checkboxPicker.childs.filter(
        (radioPicker) => radioPicker.selected
      );
    },

    // isIos() {
    //   return /iphone|ipad|ipod/.test( window.navigator.userAgent.toLowerCase() );
    // }
  },

  methods: {
    addToCart() {
      console.log()
      this.item.picker = {
        required: this.radioPickerSelected,
        optional: this.checkboxPickerSelected
      }
      this.$emit("addToCart", this.item);
    },
    changeQuantity(child, toDo, changeCount = false) {
      if (!changeCount) {
        if (toDo.toLowerCase().trim() == "plus") {
          child.quantity++;
        } else if (toDo.toLowerCase().trim() == "minus" && child.quantity > 1) {
          child.quantity--;
        } else if (child.quantity == 1) {
          child.selected = false;
        }
      } else {
        if (toDo.toLowerCase().trim() == "plus") {
          child.count++;
        } else if (toDo.toLowerCase().trim() == "minus" && child.count > 1) {
          child.count--;
        }
      }
    },

    toggleDescription() {
      this.fullDescription = !this.fullDescription;
    },

    async markerPopupHandle(card) {
      const respone = await this.$refs.markerPopup.open();
    },

    async energyPopupHandle(card) {
      const respone = await this.$refs.energyPopup.open();
    },
  },

  watch: {
    item() {
      this.item.count = 1;
      this.checkboxPicker.childs.map((item) => {
        item.quantity = 0;
        item.selected = false;
      });
    },
  },
};
</script>
