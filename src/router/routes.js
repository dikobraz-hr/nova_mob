const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'category/:id', component: () => import('pages/CategoryPage.vue'), props: true },
      {path: '/category-all',component: () => import('pages/CategoryAll.vue'),name: 'CategoryAll'},
      
    
    ]
  },


]

export default routes
