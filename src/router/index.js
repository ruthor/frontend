import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import CrewList from '../components/CrewList.vue'
import CrewDocument from '../components/CrewDocument.vue'
import Rank from '../components/Rank.vue'
import Document from '../components/Document.vue'
import UserType from '../components/UserType.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crewlist',
      name: 'crewlist',
      component: CrewList
    },
    {
      path: '/usertype',
      name: 'usertype',
      component: UserType
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/document',
      name: 'document',
      component: Document
    },
    {
      path: '/crewdocument',
      name: 'crewdocument',
      component: CrewDocument
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
