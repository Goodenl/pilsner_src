<template>
  <nav :class="{ 'nav-bar': true, 'nav-bar--ios': isIos }">
    <ul class="nav-bar__list">
      <li
        v-for="nav in navs"
        :class="{
          'nav-bar__item': true,
          'nav-bar__item--selected': nav.selected,
        }"
        @click="goTo(nav)"
      >
        <svg class="nav-bar__icon">
          <use :xlink:href="$getURL(`/pwa/icons/nav-pack.svg#${nav.svgId}`)" />
        </svg>
        <span class="text-small-menu">{{ nav.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",

  created() {
    console.log();
    this.selNav(this.$route.name);
  },

  data() {
    return {
      navs: [
        {
          svgId: "dashboard",
          selected: false,
          title: "dashboard",
        },
        {
          svgId: "info",
          selected: false,
          title: "Conditions",
        },
        {
          svgId: "menu",
          selected: true,
          title: "Menu",
        },
        {
          svgId: "delivery",
          selected: false,
          title: "Delivery",
        },
        {
          svgId: "cart",
          selected: false,
          title: "Cart",
        },
      ],
    };
  },

  computed: {
    isIos() {
      return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    },
  },

  methods: {
    selNav(navName) {
      this.navs.map((item) => (item.selected = false));
      this.navs.find(
        (item) => item.title.toLowerCase() == navName
      ).selected = true;
    },
    goTo(nav) {
      this.$router.push({ name: nav.svgId });
    },
  },
};
</script>
