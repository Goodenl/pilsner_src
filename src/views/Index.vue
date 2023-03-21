<template>
	<section>
   <loading/>

    <tm-popup blockedScreen ref="TMPopup"/> 
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue'
import TmPopup from '@/components/TmPopup.vue'

export default {

  name: 'Index',

  components: {
    Loading,
    TmPopup
  },

  created() {
    if (navigator.onLine) setTimeout(async () => await this.$refs.TMPopup.openTMPopup(), 3000);
  },

}
</script>