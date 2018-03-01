import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
// import index from '@/components/index/index'
import product from '@/components/product/product'
import solutions from '@/components/solutions/solution'
import example from '@/components/example/example'
import datareport from '@/components/datareport/datareport'
import sendmsg from '@/components/sendmsg/sendmsg'
import aboutus from '@/components/aboutus/aboutus'
import team from '@/components/team/team'
import commit from '@/components/commit/commit'
import dynamics from '@/components/dynamics/dynamics'
import joinus from '@/components/joinus/joinus'
import contach from '@/components/contach/contach'


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
    },{
      path: '/',
      name: 'product',
      component: product
    },
    {
      path: '/example',
      name: 'example',
      component: example
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: solutions
    },
    {
      path: '/datareport',
      name: 'datareport',
      component: datareport
    },
     {
      path: '/sendmsg',
      name: 'sendmsg',
      component: sendmsg
    },
     {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    },
     {
      path: '/team',
      name: 'team',
      component: team
    },
     {
      path: '/commit',
      name: 'commit',
      component: commit
    },
    {
      path: '/dynamics',
      name: 'dynamics',
      component: dynamics
    },
   {
      path: '/joinus',
      name: 'joinus',
      component: joinus
    },
   {
      path: '/contach',
      name: 'contach',
      component: contach
    },
    {
      path: '*',

      component: product
    },
  ]
})
