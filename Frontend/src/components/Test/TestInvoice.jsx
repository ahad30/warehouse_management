import { useState } from "react";
import AllItem from "./AllItem";
import Billing from "./Billing";


const TestInvoice = () => {
    const [data , setData] = useState({

    })

    return (
        <div>
            <Billing  ></Billing>
            <AllItem></AllItem>
            
        </div>
    );
};

export default TestInvoice;