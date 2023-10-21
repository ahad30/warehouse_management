import { Link, useLocation } from "react-router-dom";
import Step from "./Step";

const InstallationFinish = ({setDatabaseSql}) => {

  const location = useLocation();
  const path = location?.pathname   

  const submitData = (e)=> {
    
    const {name, value} = e.target;
    
    setDatabaseSql((prev)=> ({...prev, [name]: value}))
 }
  return (
    <div className="lg:p-12 p-3">

      <Step path={path}></Step>
      
        <form action="" className="w-full flex lg:p-12 bg-gray-100 justify-center ">
          <label htmlFor="file">
            <div>
              <p className="btn text-white btn-wide bg-blue-500">Import SQL</p>
            </div>
            <input onChange={submitData} name="sql_file" className="hidden" id="file" type="file" />
          </label>
        </form>

        <div className="flex justify-between   my-12 items-center">
        <button className="btn text-white hover:text-black bg-black">
          <Link  to={"/configuration"}>Prev</Link>
        </button>
        <button className="btn text-white hover:text-black bg-black" >
          Finish
        </button>
      </div>
     
    </div>
  );
};

export default InstallationFinish;
