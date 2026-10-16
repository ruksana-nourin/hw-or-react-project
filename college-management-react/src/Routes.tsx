import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./views/pages/Dashboard";
import Students from "./views/pages/students/StudentManage";
import ManageFeeCategory from "./views/pages/fee-category/ManageFeeCategory";
import CreateFeeCategory from "./views/pages/fee-category/CreateFeeCategory";
import ShowFeeCategory from "./views/pages/fee-category/ShowFeeCategory";
import EditFeeCategory from "./views/pages/fee-category/EditFeeCategory";
import ManageFeeStructure from "./views/pages/fee-structure/ManageFeeStructure";
import ManageFeePayment from "./views/pages/fee-payment/ManageFeePayment";
import CreateFeePayment from "./views/pages/fee-payment/CreateFeePayment";
import ShowFeePayment from "./views/pages/fee-payment/ShowFeepayment";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'students',
                element: <Students />
            },
            // fee category
            {
                path: 'fee-categories',
                element: <ManageFeeCategory />
            },
            {
                path: "fee-categories/create",
                element: <CreateFeeCategory />,
            },
            {
                path: "fee-categories/:id",
                element: <ShowFeeCategory />,
            },
            {
                path: "fee-categories/:id/edit",
                element: <EditFeeCategory />,
            },

            // fee structure
            {
                path: "fee-structures",
                element: <ManageFeeStructure />,
            },

            //fee payment
            {
                path: "fee-payments",
                element: <ManageFeePayment />,
            },
            {
                path: "/fee-payments/create",
                element: < CreateFeePayment />
            },
            {
                path: "/fee-payments/:id",
                element: < ShowFeePayment />
            },
            

        ]
    },

])