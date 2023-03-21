<template>
  <div class="loading">

    <div class="loading__bg-box">
      <img class="loading__bg loading__bg--top" src="/pwa/bg/loading-bg-top.webp" alt="background top photo">
      <img class="loading__bg loading__bg--bottom" src="/pwa/bg/loading-bg-bottom.webp" alt="background bottom photo">
    </div>

    <div class="loading__info loading__info--loaded">
      <img class="loading__logo" src="/pwa/icons/logo.svg" alt="logo">

      <h2 class="text-white text-center text-huge">Good morning</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',


  data() {
    return {
      loaded: false
    }
  },
}
</script>