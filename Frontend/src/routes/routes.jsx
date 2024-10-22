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
// import CustomersList from "../Dashboard/Customers/CustomersList";
import SearchProducts from "../Dashboard/SearchProducts/SearchProducts";
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
import MSACRoute from "./MSACRoute";

import PermissionDenied from "../pages/Errors/PermissionDenied";
import HistoryList from "../Dashboard/History/HistoryList";
import Pos from "../Dashboard/Pos/Pos";
import TransferProduct from "../Dashboard/TransferProduct/TransferProduct";
import Export from "../Dashboard/Import/Export";
import SuperAndAdminAndEmployeeRoutes from "./PrivateRoutes/SuperAndAdminAndEmployeeRoutes";
import SuperAndAdmin from "./PrivateRoutes/SuperAndAdmin";
import SuperAdminRoutes from "./PrivateRoutes/SuperAdminRoutes";

// Create the routes for the application using react-router-dom
const routes = createBrowserRouter([
  {
    path: "/403",
    element: <PermissionDenied />,
  },
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
          // {
          //   path: "/dashboard", // Default dashboard analytics
          //   element: (

          //       <DashboardAnalytics />

          //   ),
          // },

          // Import/Export

          {
            path: "/dashboard/import",
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <Export />
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },
          // USERS
          {
            path: "/dashboard/user", // Users list
            element: (
              <SuperAndAdmin>
                <UsersList />
              </SuperAndAdmin>
            ),
          },
          {
            path: "/dashboard/user/add", // Add a new user
            element: (
              <SuperAdminRoutes>
                <AddUser />
              </SuperAdminRoutes>
            ),
          },
          // CUSTOMERS
          // {
          //   path: "/dashboard/customer", // Customers list
          //   element: (
          //     <ManagerRoute>
          //       <CustomersList />
          //     </ManagerRoute>
          //   ),
          {
            path: "/dashboard/product/search",
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <SearchProducts />
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },
          // {
          //   path: "/dashboard/customer/add", // Add a new customer
          //   element: <AddCustomer />,
          // },
          // CATEGORIES
          {
            path: "/dashboard/category", // Categories list
            element: (
              <SuperAndAdmin>
                <CategoriesList />
              </SuperAndAdmin>
            ),
          },
          {
            path: "/dashboard/category/add", // Add a new category
            element: (
              <SuperAdminRoutes>
                <AddCategory />
              </SuperAdminRoutes>
            ),
          },
          // BRANDS
          {
            path: "/dashboard/brand", // Brands list
            element: (
              <SuperAndAdmin>
                <BrandsList />
              </SuperAndAdmin>
            ),
          },
          {
            path: "/dashboard/brand/add", // Add a new brand
            element: (
              <SuperAdminRoutes>
                <AddBrand />
              </SuperAdminRoutes>
            ),
          },
          // STORE
          {
            path: "/dashboard/store", // Stores list
            element: (
              <SuperAndAdmin>
                <StoresList />
              </SuperAndAdmin>
            ),
          },
          {
            path: "/dashboard/store/add", // Add a new store
            element: (
              <SuperAdminRoutes>
                <AddStore />
              </SuperAdminRoutes>
            ),
          },
          // PRODUCTS
          {
            path: "/dashboard/product", // Products list
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <ProductsList />
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },
          {
            path: "/dashboard/product/add", // Add a new product
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <AddProduct />
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },
          // REPORT
          {
            path: "/dashboard/report", // Report layout
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <ReportLayout />
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },

          // History
          {
            path: "/dashboard/history",
            element: (
              <SuperAndAdmin>
                <HistoryList />
              </SuperAndAdmin>
            ),
          },
          {
            path: "/dashboard/products/transfer",
            element: (
              <SuperAndAdmin>
                <TransferProduct />
              </SuperAndAdmin>
            ),
          },

          // {
          //   path: "/dashboard/analytics", // Dashboard analytics
          //   element: <DashboardAnalytics />,
          // },
          // INVOICE
          // {
          //   path: "/dashboard/invoice/new", // Create a new invoice
          //   element: (
          //     <MSACRoute>
          //       <NewInvoice />
          //     </MSACRoute>
          //   ),
          // },
          {
            path: "/dashboard/pos", // Create a new invoice
            element: (
              <SuperAndAdminAndEmployeeRoutes>
                <Pos></Pos>
              </SuperAndAdminAndEmployeeRoutes>
            ),
          },
          // {
          //   path: "/dashboard/invoice", // Invoices list
          //   element: <InvoicesList />,
          // },
          // SETTING
          {
            path: "/dashboard/setting", // Settings
            element: (
              <SuperAdminRoutes>
                <Settings />
              </SuperAdminRoutes>
            ),
          },
          // PROFILE
          // {
          //   path: "/dashboard/profile", // User profile update
          //   element: <UserProfileUpdate />,
          // },
        ],
      },
    ],
  },
]);

export default routes;
