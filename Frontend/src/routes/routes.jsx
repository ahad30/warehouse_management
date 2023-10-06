import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main/MainLayout";
import Login from "../pages/Login/Login";
import AddUser from "../Dashboard/Users/AddUser";
// import ProductsList from "../Dashboard/Products/ProductsList";
import AddProduct from "../Dashboard/Products/AddProduct";
// import CategoriesList from "../Dashboard/Categories/CategoriesList";
import AddCategory from "../Dashboard/Categories/AddCategory";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import AddCustomer from "../Dashboard/Customers/AddCustomer";
import UsersList from "../Dashboard/Users/UsersList";
// import CustomersList from "../Dashboard/Customers/CustomersList";
import InvoicesList from "../Dashboard/Invoices/InvoicesList";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import PdfSettings from "../Dashboard/Settings/PdfSettings";
import ReportList from "../Dashboard/Report/Reports/ReportList";
import Analytics from "../Dashboard/Report/Analytics/Analytics";
import NewInvoice from "../Dashboard/Invoices/NewInvoice/NewInvoice";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import InvoiceA4 from "../components/InvoicePages/InvoiceA4";
// import AdminRoute from "./AdminRoute";
import AdminList from "../Dashboard/Users/AdminList";
import ManagerList from "../Dashboard/Users/ManagerList";
import SalesManList from "../Dashboard/Users/SalesManList";
import CategoriesListCustom from "../Dashboard/Categories/CategoriesListCustom";
import CustomersListCustom from "../Dashboard/Customers/CustomersListCustom";
import AddBrand from "../Dashboard/Brands/AddBrand";
// import BrandsList from "../Dashboard/Brands/BrandsList";
import AddStore from "../Dashboard/Stores/AddStore";
// import StoresList from "../Dashboard/Stores/StoresList";
import ProductsListCustom from "../Dashboard/Products/ProductsListCustom";
import BrandListCustom from "../Dashboard/Brands/BrandListCustom";
// import Settings from "../Dashboard/Settings/Settings";
import SettingsNew from "../Dashboard/Settings/SettingsNew";
import StoreListCustom from "../Dashboard/Stores/StoreListCustom";

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
        path: "/print/a4",
        element: <InvoiceA4 />,
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
        element: <Analytics />,
      },
      // USERS
      {
        path: "/dashboard/user",
        element: <UsersList />,
      },
      // Admins
      {
        path: "/dashboard/user/admins",
        element: <AdminList />,
      },
      // Managers
      {
        path: "/dashboard/user/managers",
        element: <ManagerList />,
      },
      // Managers
      {
        path: "/dashboard/user/sales-man",
        element: <SalesManList />,
      },
      {
        path: "/dashboard/user/add",
        element: <AddUser />,
      },
      // CUSTOMERS
      {
        path: "/dashboard/customer",
        // element: <CustomersList />,
        element: <CustomersListCustom></CustomersListCustom>,
      },
      {
        path: "/dashboard/customer/add",
        element: <AddCustomer />,
      },
      // CATEGORIES
      {
        path: "/dashboard/category",
        // element: <CategoriesList />,
        element: <CategoriesListCustom />,
        // element: <CatgorisListCustomAgain></CatgorisListCustomAgain>,
      },
      {
        path: "/dashboard/category/add",
        element: <AddCategory />,
      },
      // BRANDS
      {
        path: "/dashboard/brand",
        // element: <BrandsList />,
        element: <BrandListCustom></BrandListCustom>,
      },
      {
        path: "/dashboard/brand/add",
        element: <AddBrand />,
      },
      // STORE
      {
        path: "/dashboard/store",
        // element: <StoresList />,
        element: <StoreListCustom></StoreListCustom>,
      },
      {
        path: "/dashboard/store/add",
        element: <AddStore />,
      },
      // PRODUCTS
      {
        path: "/dashboard/product",
        // element: <ProductsList />,
        element: <ProductsListCustom></ProductsListCustom>,
      },
      {
        path: "/dashboard/product/add",
        element: <AddProduct />,
      },
      // REPORT
      {
        path: "/dashboard/report",
        element: <ReportList />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
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
        // element: <Settings></Settings>,
        element: <SettingsNew></SettingsNew>,
      },
      {
        path: "/dashboard/setting/pdf",
        element: <PdfSettings />,
      },
    ],
  },
]);

export default routes;
