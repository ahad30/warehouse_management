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
import MSACIRoute from "./MSACIRoute";
import MACRoute from "./MACRoute";
import MIRoute from "./MIRoute";
import ManagerRoute from "./ManagerRoute";
import HomePage from "../pages/HomePage";
import Installation from "../pages/Installation/Installation";
import PreInstallation from "../pages/Installation/PreInstallation";
import Verification from "../pages/Installation/Verification";
import Configuration from "../pages/Installation/Configuration";
import InstallationFinish from "../pages/Installation/InstallationFinish";
import InstallationRoute from "./InstallationRoute";

// Create the routes for the application using react-router-dom
const routes = createBrowserRouter([
  {
    path: "/", // Root path
    element: <MainLayout />, // Main layout component
    errorElement: <ErrorPage />, // Error page component
    children: [
      {
        path: "/", // Root path
        element: (
          <InstallationRoute>
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          </InstallationRoute>
        ),
      },
      {
        path: "/login", // Login page
        element: (
          <InstallationRoute>
            <Login />
          </InstallationRoute>
        ),
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
      {
        path: "/installation", // Password reset page with token
        element: <Installation />,
      },
      {
        path: "/pre-installation", // Password reset page with token
        element: <PreInstallation />,
      },
      {
        path: "/verification", // Password reset page with token
        element: <Verification />,
      },
      {
        path: "/configuration", // Password reset page with token
        element: <Configuration />,
      },
      {
        path: "/final-step", // Password reset page with token
        element: <InstallationFinish />,
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
            path: "/dashboard", // Default dashboard analytics
            element: (
              <AdminRoute>
                <DashboardAnalytics />
              </AdminRoute>
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
            element: (
              <ManagerRoute>
                <CustomersList />
              </ManagerRoute>
            ),
          },
          {
            path: "/dashboard/customer/add", // Add a new customer
            element: (
              <ManagerRoute>
                <AddCustomer />
              </ManagerRoute>
            ),
          },
          // CATEGORIES
          {
            path: "/dashboard/category", // Categories list
            element: (
              <MIRoute>
                <CategoriesList />
              </MIRoute>
            ),
          },
          {
            path: "/dashboard/category/add", // Add a new category
            element: (
              <MIRoute>
                <AddCategory />
              </MIRoute>
            ),
          },
          // BRANDS
          {
            path: "/dashboard/brand", // Brands list
            element: (
              <MIRoute>
                <BrandsList />
              </MIRoute>
            ),
          },
          {
            path: "/dashboard/brand/add", // Add a new brand
            element: (
              <MIRoute>
                <AddBrand />
              </MIRoute>
            ),
          },
          // STORE
          {
            path: "/dashboard/store", // Stores list
            element: (
              <MIRoute>
                <StoresList />
              </MIRoute>
            ),
          },
          {
            path: "/dashboard/store/add", // Add a new store
            element: (
              <MIRoute>
                <AddStore />
              </MIRoute>
            ),
          },
          // PRODUCTS
          {
            path: "/dashboard/product", // Products list
            element: (
              <MIRoute>
                <ProductsList />
              </MIRoute>
            ),
          },
          {
            path: "/dashboard/product/add", // Add a new product
            element: (
              <MIRoute>
                <AddProduct />
              </MIRoute>
            ),
          },
          // REPORT
          {
            path: "/dashboard/report", // Report layout
            element: (
              <MACRoute>
                <ReportLayout />
              </MACRoute>
            ),
          },
          {
            path: "/dashboard/analytics", // Dashboard analytics
            element: (
              <AdminRoute>
                <DashboardAnalytics />
              </AdminRoute>
            ),
          },
          // INVOICE
          {
            path: "/dashboard/invoice/new", // Create a new invoice
            element: (
              <MSACIRoute>
                <NewInvoice />
              </MSACIRoute>
            ),
          },
          {
            path: "/dashboard/invoice", // Invoices list
            element: (
              <MSACIRoute>
                <InvoicesList />
              </MSACIRoute>
            ),
          },
          // SETTING
          {
            path: "/dashboard/setting", // Settings
            element: (
              <AdminRoute>
                <Settings />
              </AdminRoute>
            ),
          },
          // PROFILE
          {
            path: "/dashboard/profile", // User profile update
            element: <UserProfileUpdate />,
          },
        ],
      },
    ],
  },
]);

export default routes;
