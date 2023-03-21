<template>
	<popup :blockedScreen="blockedScreen" ref="TMPopup">
    <template v-slot:main>
      <span class="text-tabs-active">Choose a restaurant</span>
    </template>
    <template v-slot:footer="{confirm}">

      <ul class="popup-TM__list">
        <li
          v-for="tm in TMlist"
          :key="tm.title"
          @click="confirm(tm)"
          class="popup-TM__item "
        >
          <img :src="tm.imgUrl" :alt="tm.title">
          <span class="text-big-norm">{{tm.title}}</span>
        </li>
      </ul>

    </template>
  </popup>
</template>

<script>
import Popup from '@/components/Popup.vue'

export default {

  name: 'TmPopup',

  props: {
  	blockedScreen: Boolean
  },

  components: {
    Popup
  },

  data () {
    return {
    	TMlist: [
        {imgUrl: this.$getURL('/pwa/icons/pilsner.svg'), title: 'Pilsner'},
        {imgUrl: this.$getURL('/pwa/icons/pilsner.svg'), title: 'Pilsner 2'},
        {imgUrl: this.$getURL('/pwa/icons/pilsner.svg'), title: 'Pilsner 3'},
      ],
    }
  },

  methods: {
    async openTMPopup() {
      const popupResult = await this.$refs.TMPopup.open()
      if (popupResult) {
        this.$store.commit('setTM', popupResult)
        this.$router.push({name: 'dashboard'})
      }
    }
  }
}
</script>