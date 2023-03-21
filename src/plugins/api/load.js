export default {
	install: (app) => {
		app.prototype.$load = async (action, errHandler) => {
			try {
				await action()
			} catch (error){
				if (errHandler) {
					errHandler(error)
				} else {
					if (error.response?.status == 403 && window.location?.pathname != "/") {
						window.location = "../"
						window.localStorage.setItem("logout", JSON.stringify(true))
					}
				}
      }
		}
	}
}