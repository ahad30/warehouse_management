import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main/MainLayout";
import Login from "../pages/Login/Login";
import AddUser from "../Dashboard/Users/AddUser";
import ProductsList from "../Dashboard/Products/ProductsList";
import AddProduct from "../Dashboard/Products/AddProduct";
import CategoriesList from "../Dashboard/Categories/CategoriesList";
import AddCategory from "../Dashboard/Categories/AddCategory";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import AddCustomer from "../Dashboard/Customers/AddCustomer";
import UsersList from "../Dashboard/Users/UsersList";
import CustomersList from "../Dashboard/Customers/CustomersList";
import InvoicesList from "../Dashboard/Invoices/InvoicesList";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import DefaultSettings from "../Dashboard/Settings/DefaultSettings";
import PdfSettings from "../Dashboard/Settings/PdfSettings";
import ReportList from "../Dashboard/Report/Reports/ReportList";
import Analytics from "../Dashboard/Report/Analytics/Analytics";
import NewInvoice from "../Dashboard/Invoices/NewInvoice/NewInvoice";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import InvoiceA4 from "../components/InvoicePages/InvoiceA4";

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
        path: "/dashboard/setting/default",
        element: <DefaultSettings />,
      },
      {
        path: "/dashboard/setting/pdf",
        element: <PdfSettings />,
      },
    ],
  },
]);

export default routes;
