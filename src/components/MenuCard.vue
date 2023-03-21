<template>
	<li v-if="card" class="menu-card__item"	>
		<div @click="openDetail" class="menu-card__header">
			<span v-if="card.promo" class="menu-card__promo-text">Promo</span>
			<img v-lazy="'.'+card.image || $getURL('/img/picture/no-photo.png')" alt="position" class="menu-card__img" :class="[!card.image && 'menu-card__img--no-photo']">
			<div class="menu-card__icons">
				<img src="@/assets/image/icons/info.svg" alt="" class="menu-card__info">

				<ul class="menu-card__icons-list">
					<li class="menu-card__icons-item">
						<img src="@/assets/image/icons/spicy.svg" alt="">
					</li>
					<li class="menu-card__icons-item">
						<img src="@/assets/image/icons/vegan.svg" alt="">
					</li>
					<li class="menu-card__icons-item">
						<img src="@/assets/image/icons/vegan.svg" alt="">
					</li>
				</ul>

			</div>
		</div>

		<div class="menu-card__footer">
			<div class="menu-card__text">
				<h4>{{card.title}}</h4>

				<span v-if="card.quantity == undefined" class="text-med-norm text-primary-light">{{formattedWeight}}</span>
				<p v-else class="text-med-norm text-primary-light menu-card__quantity-text">
					<span class="text-med-bold">{{formattedWeight}}</span>
				</p>
			</div>

			<c-button @click="addToCart(card)" v-if="card.quantity == undefined || card.quantity == 0" class="btn"><h3 class="text-white">{{formattedPrice}} €</h3></c-button>
			<div class="menu-card__quantity" v-else>
				<c-button @click="changeQuantity(card, 'minus')" class="btn">-</c-button>
				<span class="menu-card__quantity-count">{{card.quantity}}</span>
				<c-button @click="changeQuantity(card, 'plus')" class="btn">+</c-button>
			</div>
		</div>

	</li>
</template>

<script>
export default {

  name: 'MenuCard',

  props: {
  	card: Object
  },

  computed: {
  	formattedWeight() {
  		return this.card.weight
  		//this.card.weight?.search(/(г|кг|мл|л)\.?/gmi) == -1 ? this.card.weight + ' г.' : 
  	},
		formattedPrice() {
			return this.card?.price.toString()?.slice(0, -1) ? this.card.price.toString().slice(0, -1) : '0'
		}
  },

  methods: {
  	changeQuantity(card, toDo) {
			if( toDo.toLowerCase() == "minus" && card.quantity == 1) {
				this.$store.commit('removeMealList', card)
			} else {
				this.$store.commit("toDoQuantity", {title: card.title, toDo, amount: 1})
			}
  	},

		addToCart(card) {
			this.$emit('addToCart', card)
		},
  	openDetail() {
  		this.$emit('openDetail')
  	}
  }
}
</script>