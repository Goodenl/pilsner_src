import { createRouter, createWebHistory } from 'vue-router';

// const Index = () => import('@/views/Index.vue'),
// 			DashBoard = () => import('@/views/DashBoard.vue'),
// 			MenuSheets = () => import('@/views/MenuSheets.vue');

import Index from '@/views/Index.vue';
import DashBoard from '@/views/DashBoard.vue';
import MenuSheets from '@/views/MenuSheets.vue';
import Cart from '@/views/Cart.vue';

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: DashBoard,
	},
	{
		path: '/menu',
		name: 'menu',
		component: MenuSheets,
		meta: {transition: 'none'}
	},
	{
		path: '/menu-market',
		name: 'menu-market',
		component: MenuSheets,
		props: {isMarket: true},
		meta: {transition: 'none'}
	},
	{
		path: '/delivery',
		name: 'delivery',
		component: MenuSheets,
	},
	{
		path: '/cart',
		name: 'cart',
		component: Cart,
	},
	{
		path: '/info',
		name: 'info',
		component: MenuSheets,
	},
	{ 
		path: '/:pathMatch(.*)*',
		redirect: { name: 'index' }
	}
]

const router = createRouter({
	history: createWebHistory(process.env.NODE_ENV === 'production' ? '/pilsner/' : '/',),
	routes,
	scrollBehavior() {
    return { top: 0 }
  }
})

export default router