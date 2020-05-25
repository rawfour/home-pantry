import ProductList from 'views/ProductList';
import ShoppingList from 'views/ShoppingList';
import AddProduct from 'views/AddProduct';
import EditProduct from 'views/EditProduct';
import Settings from 'views/Settings';
import NotFound from 'views/NotFound';

export const routes = [
  {
    name: 'home',
    path: '/yourStorage',
    Component: ProductList,
    isExact: false,
  },
  {
    name: 'shoppingList',
    path: '/shoppingList',
    Component: ShoppingList,
    isExact: true,
  },
  {
    name: 'add',
    path: '/addProduct',
    Component: AddProduct,
    isExact: true,
  },
  {
    name: 'edit',
    path: '/product/:id/edit',
    Component: EditProduct,
    isExact: true,
  },
  {
    name: 'settings',
    path: '/settings',
    Component: Settings,
    isExact: true,
  },
  {
    name: '404',
    path: '/notFound',
    Component: NotFound,
    isExact: false,
  },
];
