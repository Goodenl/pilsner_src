<template>
  <section class="dashboard section">
    <div class="container">
      <div class="dashboard__wrap">
        <header class="dashboard__header header--ios">
          <div class="container">
            <h1>{{ $store.getters.getTM.title }}</h1>

            <div @click="openTMPopup" class="dashboard__drop-arrow">
              <img src="@/assets/image/icons/drop-arrow.svg" alt="" />
            </div>
          </div>
        </header>
        <main class="dashboard__main">
          <ul class="panel__list">
            <li class="panel__item">
              <img
                class="panel__bg"
                src="/pwa/picture/panel-about.jpg"
                alt=""
              />
              <span class="title__about text-white">About us</span>
            </li>

            <li class="panel__item panel__item--primary">
              <div class="panel__wrap">
                <div class="panel__text text-white-childs">
                  <h2>Bonus Card</h2>
                  <p class="text-med-norm panel-bonus">Available at</p>
                  <span>
                    <h2>1280</h2>
                    <h4>bonuses</h4>
                  </span>
                </div>
                <img class="panel__qr" src="/pwa/picture/panel-qr.svg" alt="" />
              </div>
            </li>

            <li class="panel__item panel__item--accent">
              <div class="panel__wrap panel__wrap--p20">
                <!-- <img
                  class="panel__patch"
                  src="/pwa/icons/patch-prize.svg"
                  alt=""
                /> -->
                <div class="panel__text text-white-childs">
                  <h2>Patch card</h2>
                  <p class="panel-patch">Activity</p>
                  <ul class="panel__patch-list">
                    <li
                      v-for="(item, index) in Array(5)"
                      :key="item"
                      :class="{
                        'panel__patch-item': true,
                        'panel__patch-item--has': index <= 2,
                      }"
                    >
                      <img
                        :src="
                          index <= 2
                            ? $getURL('/pwa/icons/patch-has.svg')
                            : $getURL('/pwa/icons/patch.svg')
                        "
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li class="panel__item">
              <div class="panel__wrap panel__wrap--news-promo">
                <img src="/pwa/icons/news-promo.svg" alt="" />
                <h2>News and Promotions</h2>
              </div>
            </li>
          </ul>

          <ul class="grid-panel__list text-white-childs">
            <li
              v-for="gridItem in gridList"
              :key="gridItem.title"
              :class="['grid-panel__item', ...gridItem.classes]"
              @click="gridItem?.link && $router.push(gridItem?.link)"
            >
              <div class="grid-panel__img">
                <img :src="gridItem.imgUrl" alt="" />
              </div>
              <div class="grid-panel__text">
                <p class="text-big-bold">{{ gridItem.title }}</p>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>

    <tm-popup ref="TMPopup" />
  </section>
</template>

<script>
import TmPopup from "@/components/TmPopup.vue";

export default {
  name: "DashBoard",

  components: {
    TmPopup,
  },

  mounted() {
    this.$store.dispatch("fetchApplications");
  },

  data() {
    return {
      gridList: [
        {
          imgUrl: this.$getURL("/pwa/icons/menu.svg"),
          title: "Menu",
          link: {
            name: "menu",
          },
          classes: [null],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/my-orders.svg"),
          title: "My orders",
          classes: ["grid-panel__item--accent"],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/lunch-gift.svg"),
          title: "Lunch card",
          link: {
            name: "menu",
          },
          classes: ["grid-panel__item--accent"],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/lunch.svg"),
          title: "Business lunch",
          link: {
            name: "menu",
          },
          classes: [null],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/time.svg"),
          title: "Booking",
          link: {
            name: "menu",
          },
          classes: [null],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/pickup.svg"),
          title: "Pickup",
          link: {
            name: "menu",
          },
          classes: ["grid-panel__item--accent"],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/delivery-table.svg"),
          title: "Delivery to the table",
          link: {
            name: "menu",
          },
          classes: ["grid-panel__item--accent"],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/marker.svg"),
          title: "Restaurants",
          link: {
            name: "menu",
          },
          classes: [null],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/review.svg"),
          title: "Review",
          classes: ["grid-panel__item--white", "text-primary-children"],
        },
        {
          imgUrl: this.$getURL("/pwa/icons/settings.svg"),
          title: "Settings",
          classes: ["grid-panel__item--white", "text-primary-children"],
        },
      ],
    };
  },

  methods: {
    openTMPopup() {
      this.$refs.TMPopup.openTMPopup();
    },
  },
};
</script>
