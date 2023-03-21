import instance from './instance'
import authModule from './auth'
import catalogModule from './catalog'
import categoryModule from './category'
import sessionModule from './session'

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default {
	auth: authModule(instance, getCookie),
	catalog: catalogModule(instance, getCookie),
	category: categoryModule(instance, getCookie),
	session: sessionModule(instance, getCookie)
}