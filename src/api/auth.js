const setCookie = (name, value, options = {}) => {

	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

const deleteCookie = name => {
	setCookie(name, "", {
		'max-age': -1
	})
}

export default function(instance, getCookie) {
	return {
		signIn(body) {
			let urlencoded = new URLSearchParams();
			for(const [key, value] of Object.entries(body) ) {
				urlencoded.append(key, value);
			}
			
			return instance.post('login', urlencoded)
		},
		userInfo() {
			return instance.get('user/info', {withCredentials: true})
		},
		logOut() {
			let token = "Bearer "  + getCookie("OCSESSID");
			window.localStorage.removeItem("menu_link")
			window.localStorage.removeItem("ordered")
			window.localStorage.removeItem("stop_list")
			window.localStorage.removeItem("path")
			window.localStorage.removeItem("cart")

			deleteCookie("OCSESSID")
			deleteCookie("OCSESSID_STAMP")

			return instance.get('session/logout', {headers:{authorization: token}})
		}
	}
}