const DatabaseBackup = () => {
  return (
    <div className="flex justify-center my-12 items-center">
      {/* import export section */}
      <div className="w-full flex flex-col gap-y-8 lg:w-1/2">
        {/* import Database section start */}
        <div className="bg-gray-100 p-6 border-2 rounded-lg ">
          <h1 className="text-2xl font-semibold">Import Backup Database</h1>
          <div className="p-12 flex flex-col justify-center items-center">
            <label className="cursor-pointer w-full" htmlFor="import">
              <div className="h-[250px] flex justify-center items-center bg-white  rounded-lg border-dashed border-4">
                {" "}
                <p>
                  <span className="text-blue-700">Click to update</span> or drag
                  & drop the file
                </p>
              </div>
              <input className="hidden" id="import" type="file" />
            </label>
          </div>
        </div>
        {/* import Database section end */}

        {/* export Database section start */}
        <div className="bg-gray-100 p-6 border-2 rounded-lg">
          <p className="text-2xl font-semibold">Export Database</p>
          <button className="bg-[#0369a1] text-white my-5 btn font-light">
            Export Database
          </button>
        </div>
        {/* export Database section end */}
      </div>
    </div>
  );
};

export default DatabaseBackup;
