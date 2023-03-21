<template>
	<transition name="grow" mode="out-in">
		<li class="popup-menu__item">
			<div
				@click="toggleMenuItem"
				:class="{
					'popup-menu__item-content': true,
					'popup-menu__item-content--selected': item.selected && !lastChild,
					'popup-menu__item-content--last': lastChild
				}"
			>
				<img v-if="!item.parent_category && !lastChild" class="popup-menu__img" src="@/assets/image/picture/popup-menu.jpg" alt="">
				<img v-else-if="!lastChild" class="popup-menu__arrow" src="@/assets/image/icons/popup-menu-arrow.svg" alt="">
				<span v-else class="popup-menu__last-marker"></span>

				<h3 :class="{'text-med-norm': lastChild}" >{{item.title}}</h3>

				<div v-if="!lastChild && (item.children.length || !item.parent_category)" class="popup-menu__position-count text-accent-childs">
					<h3>{{item.allPositions}}</h3>
					<span class="text-small">поз.</span>
				</div>
				<div v-else-if="lastChild" class="popup-menu__position-action">
					<img src="@/assets/image/icons/drop-arrow.svg" alt="">
				</div>
			</div>
			<menu-popup-item
				v-for="child in nextItemRender"
				:key="child.title"
				v-show="item.selected"
				:item="child"
				:confirm="confirm"
			/>
		</li>
	</transition>
</template>

<script>
export default {

  name: 'MenuPopupItem',

  props: {
  	item: Object,
  	confirm: Function
  },

  computed: {

  	lastChild() {
  		return Boolean(this.item.children == undefined)
  	},

  	lastParent() {
  		return !this.lastChild ? !Boolean(this.item.children?.length) : false
  	},

  	nextItemRender() {
  		if (this.lastParent) {
  			return this.item.positions
  		} else {
  		  return this.item.children
  		}
  	}
  },

  methods: {
  	toggleMenuItem() {
  		this.item.selected = !this.item.selected

  		if (this.lastChild) {
  			const parent = this.$store.getters.getCards.find(item => item.positions.includes(this.item))
	  		this.selTabHandle(parent)
  		}
  	},

  	selTabHandle(item) {
  		this.confirm(item)
  	}
  }
}
</script>