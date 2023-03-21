export default {
	install: (app) => {
		app.config.globalProperties.$getURL = (url) => import.meta.env.BASE_URL + (url.startsWith('/') ? url.slice(1) : url)
	}
}