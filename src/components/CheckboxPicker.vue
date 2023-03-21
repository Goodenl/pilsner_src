<template>
	<ul class="picker__list">
		<h3>
			<slot name="title"></slot>
		</h3>
		
    <li
    	v-for="child in childs"
    	:key="child.title"
    	class="picker__item"
    >
      <label class="picker__label">
        <input
        	v-model="child.selected"
          @change="quantityHandle(child)"
        	type="checkbox"
        >
        <span class="picker__marker picker__marker--checkbox"></span>
        <slot :child="child"><p>{{child.title}}</p></slot>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CheckboxPicker',

  props: {
  	childs: Array
  },

  methods: {
    quantityHandle(child) {
      if (child.selected && child.quantity == 0) {
        child.quantity = 1
      }
    }
  }
}
</script>