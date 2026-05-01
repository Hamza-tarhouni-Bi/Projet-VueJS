import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import BookDetail from '../views/BookDetail.vue'
import Authors from '../views/Authors.vue'
import NotFound from '../views/NotFound.vue'
import Books from '../views/Books.vue'
import AllBooks from '../views/AllBooks.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Favourites from'../views/Favourites.vue'

const routes: Array<RouteRecordRaw>=[
  { path: '/', redirect: '/login' },

  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/home', name: 'Home', component: Home },
  { path: '/favourites', name: 'Favourites', component: Favourites, meta: { requiresAuth: true } },

  {
    path: '/admin/books',
    name: 'Books',
    component: Books,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  
  {
    path: '/allbooks',
    name: 'AllBooks',
    component: AllBooks,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/authors',
    name: 'Authors',
    component: Authors,
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/books/:id',
    name: 'BookDetail',
    component: BookDetail,
    meta: { requiresAuth: true }
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // Prevent users from accessing admin routes and vice versa
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    if (!isAuthenticated || role !== 'admin') {
      return '/admin/login'
    }
  }

  // Prevent non-logged-in access to auth-required user routes
  if (to.meta.requiresAuth && !isAuthenticated && !to.path.startsWith('/admin')) {
    return '/login'
  }

  // If a user tries to access a protected admin-only route manually (sanity check)
  if (to.meta.requiresAdmin && role !== 'admin') {
    return '/home'
  }
})

export default router