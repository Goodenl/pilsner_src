<template>
	<div
		@click.self="close(false)"
		ref="popup"
		:class="{'popup': true, 'popup--show': show, 'popup--draggable': draggable}"
		v-touch:swipe.bottom="swipeHandler"
	>
		<div class="popup__wrap">
			<div class="popup__content">
				<slot name="main" :confirm="confirm" :close="close"></slot>
			</div>
			<footer class="popup__footer">
				<slot name="footer" :confirm="confirm" :close="close">
					<c-button @click="confirm" class="btn">Close</c-button>
				</slot>
			</footer>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Popup',

  currentPopupController: null,

  props: {
  	draggable: Boolean,
  	blockedScreen: Boolean,
  	swipeHide: Boolean,
  },

  mounted() {
  	document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
  	document.removeEventListener('keydown', this.handleKeydown)
  },

  data() {
  	return {
  		show: false
  	}
  },

  methods: {
  	swipeHandler(dir, event) {
  		const secondPopup = this.$el.closest('.popup').parentElement.closest('.popup')
  		if (secondPopup) {
  		  if (secondPopup.scrollTop == 0) {
  		    secondPopup.scrollTop = 1
  		  }
  		}

  		if (this.swipeHide) {
	  		if (event.currentTarget.scrollTop == 0 ) {
	  		  if (event.cancelable) this.close()
	  		}
  		}
  	},

  	handleKeydown(e) {
  		if (this.show && e.key === "Escape") this.close()
  	},

  	open() {
  		let resolve, reject;

  		const popupPromise = new Promise((ok, fail) => {
  			 resolve = ok
  			 reject = fail
  		})

  		this.$options.currentPopupController = {resolve, reject} 
  		this.show = true

  		return popupPromise
  	},

  	confirm(response = true) {
  		this.$options.currentPopupController.resolve(response)
  		this.closeDown()
  	},
  	
  	close(response = false) {
  		if (!this.blockedScreen) {
  			this.$options.currentPopupController.resolve(response)
	  		this.closeDown()
  		}
  	},

  	closeDown() {
  		this.show = false
  		this.$el.scrollTop = 0
  		document.body.removeAttribute('style')
  	}
  },

  watch: {
  	show(newValue) {
  		if (newValue) {
  			if(document.body.style.overflowY != 'hidden') document.body.style.overflowY = 'hidden'
  		  if (this.$refs.popup) this.$refs.popup.style.visibility = "visible"
  		} else {
  			document.body.style.overflowY = 'auto'
  			setTimeout(()=> {if (this.$refs.popup) this.$refs.popup.style.visibility = "hidden"}, 350)
  		}
  	}
  }
}
</script>