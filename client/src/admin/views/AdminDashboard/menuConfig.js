import AddProductImg from './images/add-product.png';
import AddTableImg from './images/dining-table.png';
import ProductListImg from './images/show-list.png';
import TableListImg from './images/table-list.png';
import UserOrderImg from './images/userOrderImg.png';

const MENU_ITEM = [
  {
    title: 'Add Product',
    icon: AddProductImg,
    path: '/admin/addProduct',
  },
  {
    title: 'Add Table',
    icon: AddTableImg,
    path: '/admin/addTable',
  },
  {
    title: 'Product List',
    icon: ProductListImg,
    path: '/admin/productList',
  },
  {
    title: 'Table List',
    icon: TableListImg,
    path: '/admin/tableList',
  },
  {
    title: 'User Orders',
    icon: UserOrderImg,
    path: '/admin/orders',
  },
];

export default MENU_ITEM;
