export default {
	install: (app) => {
		app.config.globalProperties.$globalLink = (tabName) => tabName?.toLowerCase().trim().replaceAll(' ', '_')
	}
}