export default function(instance, getCookie) {
	return {
		sessionInfo() {
			let token = "Bearer " + getCookie("OCSESSID");
			
			return instance.get('session/get', {headers:{authorization: token}})
		},
	}
}