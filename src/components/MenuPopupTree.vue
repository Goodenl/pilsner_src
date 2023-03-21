<template>
	<ul class="popup-menu__list">
		<menu-popup-item
			v-for="item in list"
			:key="item.title"
			:item="item"
			:confirm="confirm"
		/>
	</ul>
</template>

<script>
import MenuPopupItem from "@/components/MenuPopupItem.vue"

export default {

  name: 'MenuPopupTree',

  components: {
  	MenuPopupItem
  },

  props: {
  	list: Array,
  	confirm: Function
  },
}
</script>