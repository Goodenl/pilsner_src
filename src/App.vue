<template>

	<router-view v-slot="{ Component, route }">
		<transition :name="route.meta.transition || 'fade'">
	    <component :is="Component" />
	  </transition>
	</router-view>

	<popup class="popup--offline" ref="offlinePopup" draggable>
		<template v-slot:main>
			<!-- Заменить на svg код -->
			<img src="/pwa/icons/offline.svg" alt="" class="offline__icon">

			<h3 class="offline__warning">Внимание!</h3>

			<h2>Интернет в данный момент отсутсвует</h2>

			<p class="offline__text">До появления связи вы можете поработать на ранее сохраненной версии контента или попробовать позже.</p>
		</template>
		<template v-slot:footer="{confirm}">
			<button @click="confirm" class="btn btn--primary">Got it</button>
		</template>
	</popup>
</template>

<script>
import Popup from '@/components/Popup.vue'

export default {
	name: 'App',

	components: {
		Popup
	},

	mounted() {

		// // Checks if should display install popup notification:
		// if (this.isIos && !this.isStandaloneMode) {
		//   this.setState({ showInstallMessage: true });
		// }
		
		if (!navigator.onLine) {
			setTimeout(this.openOfflinePopup, 500)
		} else {
			window.addEventListener('offline', this.handleConnection);
			window.addEventListener('online', this.handleConnection);
		}
		if (this.isIos && this.isStandaloneMode) this.$el.parentElement.classList.add("app--ios")
	},

	beforeUnmount() {
		window.removeEventListener('offline', this.handleConnection);
		window.removeEventListener('online', this.handleConnection);
	},

	computed: {
		isIos() {
      return /iphone|ipad|ipod/.test( window.navigator.userAgent.toLowerCase() );
    },
    isStandaloneMode() {
    	return (('standalone' in window.navigator) && (window.navigator.standalone))
    }
	},

	methods: {
		async openOfflinePopup() {
			const popupResult = await this.$refs.offlinePopup.open()
		},

		handleConnection() {
			if (navigator.onLine) {
				this.offlinePopup = false
			} else {
				this.openOfflinePopup()
			}
		}
	}

}
</script>

<style lang="sass">
@import "@/assets/style/config/_reset.css"
@import "@/assets/style/config/_vars.sass"
@import "@/assets/style/config/_mixins.sass"
@import "@/assets/style/config/global.sass"

@import "@/assets/style/app.sass"
</style>
