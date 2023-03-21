export default function(instance, getCookie) {
	return {
		create(body) {
			let token = "Bearer "  + getCookie("OCSESSID");

			const createObject = {
				id: body.id,
				type: body.type,
				title: body.title,
				trademark: body.trademark,
				parent_category: body.parent_category,
				sort_order: body.sort_order,
				description: body.description || 'Нет описания',
			}
			
			return instance.post(`/menu/categories`, createObject, {headers:{authorization: token}})
		},
		update(body) {
			let token = "Bearer "  + getCookie("OCSESSID");

			const createObject = {
				id: body.id,
				type: body.type.id,
				title: body.title,
				trademark: body.trademark,
				parent_category: body.parent_category,
				sort_order: body.sort_order,
				description: body.description || 'Нет описания',
			}
			
			return instance.post(`/menu/categories`, createObject, {headers:{authorization: token}})
		},
		delete(id) {
			let token = "Bearer "  + getCookie("OCSESSID");
			
			return instance.delete(`/menu/category/${id}`, {headers:{authorization: token}})
		},
	}
}