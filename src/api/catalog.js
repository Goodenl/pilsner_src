export default function(instance, getCookie) {
	return {
		create() {
			let token = "Bearer "  + getCookie("OCSESSID");
			
			return instance.post(`/${''}/${''}`, {headers:{authorization: token}})
		},
		info() {
			let token = "Bearer "  + getCookie("OCSESSID");
			
			return instance.get(`/${''}/${''}`, {headers:{authorization: token}})
		},
		update() {
			let token = "Bearer "  + getCookie("OCSESSID");
			
			return instance.post(`/${''}/${''}`, {headers:{authorization: token}})
		},
		delete() {
			let token = "Bearer "  + getCookie("OCSESSID");
			
			return instance.post(`/${''}/${''}`, {headers:{authorization: token}})
		},
	}
}