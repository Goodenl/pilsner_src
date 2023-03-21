import axios from 'axios'

const createDataTree = dataset => {
   const hashTable = Object.create(null);
   dataset.forEach(aData => hashTable[aData.id] = {
      ...aData,
      children: []
   });
   const dataTree = [];
   dataset.forEach(aData => {
      if (aData.parent_category) hashTable[aData.parent_category]?.children.push(hashTable[aData.id])
      else dataTree.push(hashTable[aData.id])
   });
   return dataTree;
}

const setCategories = (state, payload) => {
	payload.splice(payload.findIndex(i => i.id === "1ec87eec-fc2a-6ff4-8958-0025900cf785"), 1)
	state.categories = createDataTree(payload)
}

export default {
	state: {
		TM: 'Pilsner',

		applications: [],

		currentApplication: {
			id: "1ec57fa6-e054-6a8e-87a4-0025900cf785",
			title: "Czech pubs",
			trademarks: [
					"1ec57fa6-e08b-6a02-907f-0025900cf785",
					"1ec57fa6-e669-637a-b1f6-0025900cf785",
					"1ec57fa6-ec2f-67c8-b40f-0025900cf785"
			]
		},

		categories: [],
		categoriesTypes: [],

		menuTree: [],

		selCategory: {},
		categoryMenuShow: true,
	},
	getters: {
		getTM(state) {
			return state.TM
		},

		getTrademark(state) {
			return state.currentApplication.trademarks[0]
		},
		getCategories(state) {
			return state.categories
		},
		getMenuTree(state) {
			const outputMenuTree = []
			let cardPositions = [];

			const getChildPositions = (category) => {
				if (category.length) {
		    	category.forEach(item => getChildPositions(item))
		  	} else {
		  		if (category.children.length) {
		    		getChildPositions(category.children)
			  		cardPositions.push(...category.positions)
				  } else if (category.positions && category.positions.length) {
				  	cardPositions.push(...category.positions)
				  }
	  		}	
			}

			state.categories.forEach(item => {
				getChildPositions(item)

				outputMenuTree.push({
					title: item.title,
					parent_category: item.parent_category,
					selected: false,
					children: item.children,
					positions: item.positions,
					allPositions: cardPositions.length
				})

				cardPositions = []
			})
			
			state.menuTree = outputMenuTree

			return state.menuTree
		},
		getTabs(state) {
			const tabs = [];

			state.categories.forEach((category, index) => {
				tabs.push({
					title: category.title,
					selected: index === 0 ? true : false
				})
			})

			return tabs
		},
		getCards(state) {

			const cards = [];
			let cardPositions = [];

			const getAllPositions = (category) => {
				if (category.length) {
		    	category.forEach(item => getAllPositions(item))
		  	} else {
		  		if (category.children.length) {
			  		cardPositions.push(...category.positions)
		    		getAllPositions(category.children)
				  } else if (category.positions && category.positions.length) {
				  	cardPositions.push(...category.positions)
				  }
		  		}	
			}

			if (state.categories.length) {
				state.categories.forEach(category => {
					getAllPositions(category)

					cards.push({
						id: category.id,
						title: category.title,
						positions: cardPositions,
					})

					cardPositions = []
				})
			}

			return cards
		},
		getCategoriesTypes(state) {
			return cloneDeep(state.categoriesTypes)
		},
		getSelCategory(state) {
			return state.selCategory
		},
		catalogPositions(state) {
			return state.selCategory.positions
		},
		getSelCategoryStore(state) {
			return state.selCategory._vm.store.getNodeById
		},
		getCategoryMenuShow(state) {
			return state.categoryMenuShow
		},
		getAddresses(state) {
			return state.addresses
		},
	},
	mutations: {
		setTM(state, payload) {
			localStorage.setItem("TM", JSON.stringify(payload))
			state.TM = payload
		}
	},
	actions: {
		fetchApplications({state, getters}) {
			axios.get("appsRes.json") //'https://api.apps4business.ru/applications'
				.then(res => {
					state.applications = res.data
					state.currentApplication = res.data[0]

					return axios.get(`appsTrandRes.json`) //`https://api.apps4business.ru/menu/?trademark=${getters.getTrademark || '1ec57fa6-e08b-6a02-907f-0025900cf785'}&expand=type,positions`
				})
				.then(res => {
					setCategories(state, res.data.data)
				})
		},

		fetchCategoriesTypes({state}) {
			axios.get('catsRes.json')
				.then(res => {
					// console.log("Categories", JSON.stringify(res))
					state.categoriesTypes = res.data
				})
		}
	}
}