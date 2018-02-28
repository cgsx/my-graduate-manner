import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import resetPassword from '@/components/login/resetPassword'

import register from '@/components/login/register'
import APImanagement from '@/components/APImanagement/APImanagement'
import Solution from '@/components/Solution/Solution'
import projectmanage from '@/components/projectmanage/projectmanage'
import Spacemanage from '@/components/Spacemanage/Spacemanage'
import Membermanage from '@/components/Membermanage/Membermanage'
import Permissionmanage from '@/components/Permissionmanage/Permissionmanage'
import Permission from '@/components/Permission/Permission'
import sortmanage from '@/components/sortmanage/sortmanage'

import Advertisement from '@/components/Advertisement/Advertisement'
import Advertisinglist from '@/components/Advertisement/Advertisinglist'
import Newlyadded from '@/components/Advertisement/Newlyadded'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'APImanagement',
      component: APImanagement
    },
    {
      path: '/Solution',
      name: 'Solution',
      component: Solution
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/projectmanage',
      name: 'projectmanage',
      component: projectmanage
    },
    {
      path: '/Spacemanage',
      name: 'Spacemanage',
      component: Spacemanage
    },
    {
        path: '/Advertisement',
      name: 'Advertisement',
      component: Advertisement
    },
    {
      path: '/Advertisinglist',
      name: 'Advertisinglist',
      component: Advertisinglist
    },
    {
      path: '/Newlyadded',
      name: 'Newlyadded',
      component: Newlyadded
    },
    {
      path: '/Membermanage',
      name: 'Membermanage',
      component: Membermanage
    },
    {
      path: '/Permissionmanage',
      name: 'Permissionmanage',
      component: Permissionmanage
    },
    {
      path: '/Permission',
      name: 'Permission',
      component: Permission
    },
    {
      path: '/sortmanage',
      name: 'sortmanage',
      component: sortmanage
    },
    {
      path:'*',redirect:'/APImanagement'
    }
  ]
})
