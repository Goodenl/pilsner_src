<template>
	<li class="menu-card">
		<h1>{{cards.title}}</h1>

		<ul class="menu-card__list">
			<menu-card
				v-for="card in cards.positions"
				:card="card"
				@addToCart="$emit('addToCart', card)"
				@openDetail="$emit('openDetail', card)"
				class="menu-card__item"
			>
			</menu-card>
		</ul>
	</li>
</template>

<script>
import MenuCard from "@/components/MenuCard.vue"

export default {

  name: 'MenuCards',

  components: {
  	MenuCard
  },

  props: {
  	cards: Object
  },
}
</script>