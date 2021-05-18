import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/category/CategoryEdit.vue'
import CategoryList from '../views/category/CategoryList.vue'

import ItemEdit from '../views/item/ItemEdit.vue'
import ItemList from '../views/item/ItemList.vue'

import Edit from '../views/hero/Edit.vue'
import List from '../views/hero/List.vue'

import ArticleEdit from '../views/article/Edit.vue'
import ArticleList from '../views/article/List.vue'

import AdEdit from '../views/ad/AdEdit.vue'
import AdList from '../views/ad/AdList.vue'

import AdminUserEdit from '../views/adminUser/AdminUserEdit.vue'
import AdminUserList from '../views/adminUser/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component:Login, meta: {isPublic: true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: Edit },
      { path: '/heroes/edit/:id', component: Edit, props: true },
      { path: '/heroes/list', component: List },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!localStorage.token && !to.meta.isPublic){
    return next('/login')
  }
  next()
})

export default router
