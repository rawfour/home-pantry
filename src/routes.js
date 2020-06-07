import SignIn from 'views/Login';
import Register from 'views/Register';
import ProductList from 'views/ProductList';
import ShoppingList from 'views/ShoppingList';
import AddProduct from 'views/AddProduct';
import EditProduct from 'views/EditProduct';
import Account from 'views/Account';
import NotFound from 'views/NotFound';
import HomePage from 'views/HomePage';

export const routes = [
  {
    name: 'home',
    path: '/',
    Component: HomePage,
    isExact: true,
    needAuth: false,
  },
  {
    name: 'login',
    path: '/login',
    Component: SignIn,
    isExact: true,
    needAuth: false,
  },
  {
    name: 'register',
    path: '/register',
    Component: Register,
    isExact: true,
    needAuth: false,
  },
  {
    name: 'storage',
    path: '/yourStorage',
    Component: ProductList,
    isExact: false,
    needAuth: true,
  },
  {
    name: 'shoppingList',
    path: '/shoppingList',
    Component: ShoppingList,
    isExact: true,
    needAuth: true,
  },
  {
    name: 'add',
    path: '/addProduct',
    Component: AddProduct,
    isExact: true,
    needAuth: true,
  },
  {
    name: 'edit',
    path: '/product/:id/edit',
    Component: EditProduct,
    isExact: true,
    needAuth: true,
  },
  {
    name: 'account',
    path: '/account',
    Component: Account,
    isExact: true,
    needAuth: true,
  },
  {
    name: '404',
    path: '/notFound',
    Component: NotFound,
    isExact: false,
    needAuth: false,
  },
];
