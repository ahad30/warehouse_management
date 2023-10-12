import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main/MainLayout";
import Login from "../pages/Login/Login";
import AddUser from "../Dashboard/Users/AddUser";
import AddProduct from "../Dashboard/Products/AddProduct";
import AddCategory from "../Dashboard/Categories/AddCategory";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import AddCustomer from "../Dashboard/Customers/AddCustomer";
import UsersList from "../Dashboard/Users/UsersList";
import InvoicesList from "../Dashboard/Invoices/InvoicesList";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import NewInvoice from "../Dashboard/Invoices/NewInvoice/NewInvoice";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import CategoriesList from "../Dashboard/Categories/CategoriesList";
import CustomersList from "../Dashboard/Customers/CustomersList";
import AddBrand from "../Dashboard/Brands/AddBrand";
import AddStore from "../Dashboard/Stores/AddStore";
import ProductsList from "../Dashboard/Products/ProductsList";
import BrandsList from "../Dashboard/Brands/BrandsList";
import StoresList from "../Dashboard/Stores/StoresList";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ReportLayout from "../layouts/Dashboard/ReportLayout";
import DashboardAnalytics from "../Dashboard/Report/Analytics/DashboardAnalytics/DashboardAnalytics";
import Settings from "../Dashboard/Settings/Settings";
import UserProfileUpdate from "../Dashboard/Settings/UserProfileUpdate";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/password-reset/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/",
        element: <DashboardAnalytics />,
      },
      // USERS
      {
        path: "/dashboard/user",
        element: <UsersList />,
      },

      {
        path: "/dashboard/user/add",
        element: <AddUser />,
      },
      // CUSTOMERS
      {
        path: "/dashboard/customer",
        element: <CustomersList />,
      },
      {
        path: "/dashboard/customer/add",
        element: <AddCustomer />,
      },
      // CATEGORIES
      {
        path: "/dashboard/category",
        element: <CategoriesList />,
      },
      {
        path: "/dashboard/category/add",
        element: <AddCategory />,
      },
      // BRANDS
      {
        path: "/dashboard/brand",
        // element: <BrandsList />,
        element: <BrandsList />,
      },
      {
        path: "/dashboard/brand/add",
        element: <AddBrand />,
      },
      // STORE
      {
        path: "/dashboard/store",
        element: <StoresList />,
      },
      {
        path: "/dashboard/store/add",
        element: <AddStore />,
      },
      // PRODUCTS
      {
        path: "/dashboard/product",
        element: <ProductsList />,
      },
      {
        path: "/dashboard/product/add",
        element: <AddProduct />,
      },
      // REPORT
      {
        path: "/dashboard/report",
        element: <ReportLayout />,
      },
      {
        path: "/dashboard/analytics",
        element: <DashboardAnalytics />,
      },
      // INVOICE
      {
        path: "/dashboard/invoice/new",
        element: <NewInvoice />,
      },
      {
        path: "/dashboard/invoice",
        element: <InvoicesList />,
      },
      // SETTING
      {
        path: "/dashboard/setting",
        element: <Settings />,
      },
      // PROFILE
      {
        path: "/dashboard/profile",
        element: <UserProfileUpdate />,
      },
    ],
  },
]);

export default routes;
