import api from '../api/index'

export default {
	install: (app) => {
		app.prototype.$api = api
	}
}