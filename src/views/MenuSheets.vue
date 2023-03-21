<template>
	<section :class="{'menu-sheets section' : true, 'menu-sheets--market': isMarket}">
		
		<v-header />
		
		<main class="menu-sheets__main">

			<menu-special v-if="isMarket"/>

			<div class="menu-sheets__menu menu-sheets__menu">
				<div class="container">
					
					<menu-tabs
						:isMarket="isMarket"
						:tabs="this.$store.getters.getTabs"
						@selTabHandle="selHandle"
						@fullMenuPopupHandle="fullMenuPopupHandle"
					/>

					<ul class="menu-sheets__cards">
						<menu-cards
							@openDetail="openDetail"
							@addToCart="addToCart"
							v-for="cards in this.$store.getters.getCards"
							:cards="cards"
							:id="this.$globalLink(cards.title)"
						/>
					</ul>

				</div>
			</div>
		</main>

		<footer>
			<nav-bar />
		</footer>
		
		<popup ref="fullMenuPopup">
	    <template v-slot:main="{close}" >
	    	<div class="popup-menu__header">
	    		<img @click="close(false)" src="@/assets/image/icons/crossline.svg" alt="Close">
		      <h3>Our MENU</h3>
		      <img @click="animateReload" class="popup-menu__reload" src="@/assets/image/icons/reload.svg" alt="Перезагрузить">
	    	</div>
	    </template>
	    <template v-slot:footer="{confirm}">
	    	<menu-popup-tree :list="menuTreeList" :confirm="confirm"/>
	    </template>
	  </popup>
	  
	  <popup class="popup-position" ref="positionMenu" swipeHide>
	    <template v-slot:footer="{confirm}">

	    	<position-menu ref="position" :item="selItem" :close="confirm" @addToCart="(meal) => addToCart(meal, confirm)"/>

	    </template>
	  </popup>

	</section>
</template>

<script>
import MenuPopupTree from "@/components/MenuPopupTree.vue"
import PositionMenu from "@/components/PositionMenu.vue"
import MenuSpecial from "@/components/MenuSpecial.vue"
import MenuCards from "@/components/MenuCards.vue"
import MenuTabs from "@/components/MenuTabs.vue"
import VHeader from "@/components/VHeader.vue"
import NavBar from "@/components/NavBar.vue"
import Popup from "@/components/Popup.vue"


// import { defineAsyncComponent } from 'vue'
import {mapGetters} from 'vuex'

// const MenuCards = defineAsyncComponent(() =>
//   import("@/components/MenuCards.vue")
// )

// const MenuPopupTree = defineAsyncComponent(() =>
//   import("@/components/MenuPopupTree.vue")
// )

export default {

	async beforeRouteLeave() {
		document.body.removeAttribute('style')
  },

  name: 'MenuSheets',

  components: {
  	MenuPopupTree,
  	PositionMenu,
  	MenuSpecial,
  	MenuCards,
  	MenuTabs,
		VHeader,
  	NavBar,
  	Popup,
  },
  
  props: {
  	isMarket: Boolean
  },

  mounted() {
  	if (!this.$store.getters.getTabs.length) this.$store.dispatch('fetchApplications')
  },

  beforeUnmounted() {
  	document.body.removeAttribute('style')
  },

  data () {
    return {
    	selItem: {}
    }
  },

  computed: {
  	...mapGetters({
				menuTreeList: 'getMenuTree',
			}),
  },

  methods: {
		addToCart(card, confirm) {
			this.$store.commit("addMealList", card)
			confirm && confirm()
		},
  	selHandle({title}){
  		const categoryList = document.querySelector(`li#${this.$globalLink(title)}`)

			window.scrollTo({
				behavior: 'smooth',
				top: categoryList?.offsetTop - 40,
				left: 0
			});
  	},

  	selMenuHandle(item) {
  		setTimeout(()=> {
  			const recursionSetter = (item) => {
					item.map(child => {
						child.selected = false
						if (child.childs) recursionSetter(child.childs)
					})
				}

				recursionSetter(this.menuTreeList)
  		}, 500)

			this.selHandle(item)
  	},

  	animateReload(event) {
  		this.$store.dispatch('fetchApplications').then()

  		if (!event.target.classList.contains('popup-menu__reload--pressed')) {
	  		event.target.classList.add('popup-menu__reload--pressed')
	  		setTimeout(()=> event.target.classList.remove('popup-menu__reload--pressed'), 300)
  		}
  	},

  	async openDetail(item) {
  		this.selItem = item
  		
  		document.body.style.background = `url(${this.$refs.position.$refs.positionImage.src}) no-repeat`

  		const response = await this.$refs.positionMenu.open()

	    if (response) {
	    	document.body.removeAttribute('style')
	    }
  	},

  	async fullMenuPopupHandle() {
      const response = await this.$refs.fullMenuPopup.open()
      if (response) {
      	this.selMenuHandle(response)
      }
    },
  }
}
</script>