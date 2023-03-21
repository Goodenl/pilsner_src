<template>
	<button v-touch:tap="tapHandler">
		<slot>
			
		</slot>
	</button>
</template>

<script>
export default {
  name: 'CButton',

  data() {
  	return {
  		timeout: null,
  	}
  },

  methods: {
  	tapHandler({currentTarget}) {
  		currentTarget.classList.add("btn--pressed")

  		if (this.timeout == null) {
	  		this.timeout = setTimeout(() => {
	  			currentTarget.classList.remove("btn--pressed")
	  			clearTimeout(this.timeout)
	  		}, 600)
  		} else {
  			clearTimeout(this.timeout)
  			this.timeout = setTimeout(() => {
	  			currentTarget.classList.remove("btn--pressed")
	  			clearTimeout(this.timeout)
	  		}, 600)
  		}

  	}
  }
}
</script>