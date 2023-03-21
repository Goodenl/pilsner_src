<template>

	<div class="menu-tab header--ios">
		<img @click="fullMenuPopupHandle" src="@/assets/image/icons/more-tabs.svg" alt="more" class="menu-tab__more-tabs">
		
		<ul class="menu-tab__list" ref="tabList">
			<li
				v-for="tab in tabs"
				:class="[
					'menu-tab__item',
					'text-tabs-norm',
					tab.selected ? 'menu-tab__item--active' : '',
				]"
				:data-link="$globalLink(tab.title)"
				@click="selTab(tab)"
			>
				{{tab.title}}
			</li>
		</ul>
	</div>

</template>

<script>
import Popup from "@/components/Popup.vue"

export default {

  name: 'MenuTabs',

  components: {
  	Popup
  },

  props: {
  	tabs: Array,
  	isMarket: Boolean
  },

  emits: {
  	selTabHandle: null,
  	fullMenuPopupHandle: null
  },

  mounted() {
  	this.changeOnScroll()
		window.addEventListener('scroll', this.scrollHandle, {passive: true})
  },

  beforeUnmount() {
  	window.removeEventListener('scroll', this.scrollHandle)
  },

  data() {
  	return {
  		lastCur: '',
  	}
  },

  computed: {
  	tabsListWidth() {
  		return this.$refs.tabList.clientWidth
  	}
  },

  methods: {
  	selTab (tab) {
  		this.tabs.map(item => item.selected = false)
  		tab.selected = true
  		this.$emit('selTabHandle', tab)
  	},

  	scrollHandle() {
  		this.changeOnScroll()
  		
  		const menuTabItems = this.$refs.tabList.children,
  					scrollItems = document.querySelectorAll("li.menu-card");

			let fromTop = window.pageYOffset + 123 + 40
					
			// Get href of current scroll item
			let currentItems = [...scrollItems].filter( item => item.offsetTop < fromTop ),
					currentItem = currentItems[currentItems.length - 1].id;

			if ( this.lastCur !== currentItem ) {
				this.lastCur = currentItem;
				const needTab = document.querySelector(`li[data-link="${currentItem}"]`)

				for( let otherTabItems of menuTabItems ) {
					otherTabItems.classList.remove('menu-tab__item--active')
				}

				needTab?.classList.add('menu-tab__item--active')

				if (
						needTab.offsetLeft > this.tabsListWidth
						|| needTab.offsetLeft < (this.tabsListWidth + needTab.offsetParent.scrollLeft)
					) {
				  needTab.offsetParent.scrollTo({
						behavior: 'smooth',
						top: 0,
						left: needTab.offsetLeft
					})
				}

				currentItems = []
			}
  	},

  	changeOnScroll() {
  		if (this.isMarket) {
	  		if (document.documentElement.scrollTop >= 250) {
	  		  const menuCards = document.querySelector('.menu-sheets__cards')

	  		  menuCards.classList.add('menu-sheets__cards--fixed-tabs')
	  		  this.$el.classList.add('menu-tab--fixed')
	  		} else {
	  			const menuCards = document.querySelector('.menu-sheets__cards')

	  			menuCards.classList.remove('menu-sheets__cards--fixed-tabs')
	  			this.$el.classList.remove('menu-tab--fixed')
	  		}
	  	}
  	},

  	fullMenuPopupHandle() {
  		this.$emit('fullMenuPopupHandle')
  	},
  }
}
</script>