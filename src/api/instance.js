import axios from 'axios'

const instance = axios.create({
	baseURL: "/",
	withCredentilds: true,
	headers: {
		accept: "application/json",
		"Access-Control-Allow-Origin": "*"
	}
})

export default instance