import React from 'react';
// Soft UI Dashboard React layouts
import { Dashboard } from "view/main/dashboard";

import Methods from "_base/Methods";
import { pages } from "./pages";

// Soft UI Dashboard React icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';

const UserController = React.lazy(() => import('view/main/user'));
const ItemController = React.lazy(() => import('view/main/items'));
const VendController = React.lazy(() => import('view/main/vend'));
const CustomerController = React.lazy(() => import('view/main/customer'));
const CategoryController = React.lazy(() => import('view/main/category'));
const PurchaseController = React.lazy(() => import('view/main/purchase'));
const SalesController = React.lazy(() => import('view/main/sales'));

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    rid: "dashboard",
    icon: <DashboardIcon size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sales",
    key: "sales",
    route: pages.SALES_LIST,
    icon: <PointOfSaleIcon size="12px" />,
    component: SalesController,
    noCollapse: true,
    rid: "sales",
  },
  {
    type: "collapse",
    name: "Purchase",
    key: "purchase",
    route: pages.PURCHASE_LIST,
    icon: <InventoryIcon size="12px" />,
    component: PurchaseController,
    noCollapse: true,
    rid: "purchase",
  },
  {
    type: "collapse",
    name: "Items",
    key: "items",
    route: pages.ITEM_LIST,
    icon: <TurnedInIcon size="12px" />,
    component: ItemController,
    noCollapse: true,
    rid: "items"
  },
  {
    type: "collapse",
    name: "Vendor",
    key: "vend",
    route: pages.VEND_LIST,
    icon: <BusinessCenterIcon size="12px" />,
    component: VendController,
    noCollapse: true,
    rid: "vend",
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    route: pages.CUSTOMER_LIST,
    icon: <PeopleIcon size="12px" />,
    component: CustomerController,
    noCollapse: true,
    rid: "customer",
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    route: pages.CATEGORY_LIST,
    icon: <CategoryIcon size="12px" />,
    component: CategoryController,
    noCollapse: true,
    rid: "category",
  },
  { type: "divider", key: "divider-pages" },
  { type: "title", title: "Account", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "user",
    rid: "user",
    route: pages.PROFILE,
    icon: <AccountCircleIcon size="12px" />,
    component: UserController,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "sign-out",
    route: "/logout",
    icon: <LogoutIcon size="12px" />,
    component: () => (<Methods logout={true} />),
    noCollapse: false,
  }
];

export default routes;
