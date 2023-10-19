const InstallationFinish = ({setDatabaseSql}) => {
  const submitData = (e)=> {
    
    const {name, value} = e.target;
    
    setDatabaseSql((prev)=> ({...prev, [name]: value}))
 }
  return (
    <div className="p-5 bg-gray-100 flex justify-center">
      
        <form action="w-full">
          <label htmlFor="file">
            <div>
              <p className="btn text-white btn-wide bg-blue-500">Import SQL</p>
            </div>
            <input onChange={submitData} name="sql_file" className="hidden" id="file" type="file" />
          </label>
        </form>
     
    </div>
  );
};

export default InstallationFinish;
