import Vuex from 'vuex'
import tm from './TM'
import cart from './cart'

export default new Vuex.Store({
	modules: {
		tm,
		cart
	}
})