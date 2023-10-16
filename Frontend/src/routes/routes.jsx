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
import AdminRoute from "./AdminRoute";
import AdminManagerRoute from "./AdminManagerRoute";

// Create the routes for the application using react-router-dom
const routes = createBrowserRouter([
  {
    path: "/", // Root path
    element: <MainLayout />, // Main layout component
    errorElement: <ErrorPage />, // Error page component
    children: [
      {
        path: "/", // Default dashboard path
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
      {
        path: "/login", // Login page
        element: <Login />,
      },
      {
        path: "/register", // Registration page
        element: <Register />,
      },
      {
        path: "/forget-password", // Password recovery page
        element: <ForgetPassword />,
      },
      {
        path: "/password-reset/:token", // Password reset page with token
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard", // Dashboard path
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />, // Error page for the dashboard
    children: [
      {
        path: "/dashboard/", // Default dashboard analytics
        element: (
          <AdminManagerRoute>
            <DashboardAnalytics />
          </AdminManagerRoute>
        ),
      },
      // USERS
      {
        path: "/dashboard/user", // Users list
        element: (
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/user/add", // Add a new user
        element: (
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        ),
      },
      // CUSTOMERS
      {
        path: "/dashboard/customer", // Customers list
        element: <CustomersList />,
      },
      {
        path: "/dashboard/customer/add", // Add a new customer
        element: <AddCustomer />,
      },
      // CATEGORIES
      {
        path: "/dashboard/category", // Categories list
        element: <CategoriesList />,
      },
      {
        path: "/dashboard/category/add", // Add a new category
        element: <AddCategory />,
      },
      // BRANDS
      {
        path: "/dashboard/brand", // Brands list
        element: <BrandsList />,
      },
      {
        path: "/dashboard/brand/add", // Add a new brand
        element: <AddBrand />,
      },
      // STORE
      {
        path: "/dashboard/store", // Stores list
        element: <StoresList />,
      },
      {
        path: "/dashboard/store/add", // Add a new store
        element: <AddStore />,
      },
      // PRODUCTS
      {
        path: "/dashboard/product", // Products list
        element: <ProductsList />,
      },
      {
        path: "/dashboard/product/add", // Add a new product
        element: <AddProduct />,
      },
      // REPORT
      {
        path: "/dashboard/report", // Report layout
        element: <ReportLayout />,
      },
      {
        path: "/dashboard/analytics", // Dashboard analytics
        element: <DashboardAnalytics />,
      },
      // INVOICE
      {
        path: "/dashboard/invoice/new", // Create a new invoice
        element: <NewInvoice />,
      },
      {
        path: "/dashboard/invoice", // Invoices list
        element: <InvoicesList />,
      },
      // SETTING
      {
        path: "/dashboard/setting", // Settings
        element: (
          <AdminManagerRoute>
            <Settings />
          </AdminManagerRoute>
        ),
      },
      // PROFILE
      {
        path: "/dashboard/profile", // User profile update
        element: <UserProfileUpdate />,
      },
    ],
  },
]);

export default routes;
