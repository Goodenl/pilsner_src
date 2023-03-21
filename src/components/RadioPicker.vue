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
        	:name="name"
        	:value="child.title"
        	v-model="modelValue"
        	type="radio"
        	@change="selectedHandle"
        >
        <span class="picker__marker picker__marker--radio"></span>
        <slot :child="child"><p>{{child.title}}</p></slot>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RadioPicker',

  emits: {
  	'update:modelValue': null
  },

  props: {
  	childs: Array,
  	name: String,
  	modelValue: String
  },

  methods: {
  	selectedHandle() {
  		this.$emit('update:modelValue', this.modelValue)
  	},
  }
}
</script>