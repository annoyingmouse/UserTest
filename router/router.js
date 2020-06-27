import { Home } from '../modules/home/home.js';
import { SingleTable } from '../modules/single-table/table.js';
import { MultipleTable } from '../modules/multiple-tables/tables.js';

export const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: Home 
    },
    { 
      path: '/single', 
      name: 'table', 
      component: SingleTable 
    },
    { 
      path: '/multiple', 
      name: 'tables', 
      component: MultipleTable 
    }
  ]
})
