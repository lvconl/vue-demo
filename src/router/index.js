import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Upload from '@/views/Upload'
import Amap from '@/views/Amap'
import Home from '@/views/Home'
import Chart from '@/views/Chart'
import HomeContainer from '@/components/HomeContainer'
import SaleRecordContainer from '@/components/SaleRecordContainer'
import ShopCartContainer from '@/components/ShopCartContainer'
import MyInfoContainer from '@/components/MyInfoContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/amap',
      name: 'Amap',
      component: Amap
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/HomeContainer',
      name: 'HomeContainer',
      component: HomeContainer
    },
    {
      path: '/SaleRecord',
      name: 'SaleRecordContainer',
      component: SaleRecordContainer
    },
    {
      path: '/ShopCart',
      name: 'ShopCartContainer',
      component: ShopCartContainer
    },
    {
      path: '/MyInfo',
      name: 'MyInfoContainer',
      component: MyInfoContainer
    }
  ]
})
