const Verification = ({ setVerification }) => {
  const submitData = (e) => {
    const { name, value } = e.target;

    setVerification((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 p-5">
      <p className="font-semibold">
        Please enter your item purchase code and evanto username
      </p>

      <form className="w-full" action="">
        <div className="flex flex-col my-5 lg:flex-row gap-4">
          {/* field one */}
          <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Evanto Username</span>
            </label>
            <input
              onChange={submitData}
              type="text"
              placeholder="evanto username"
              className="input input-bordered w-full"
              name="evantoUsername"
            />
          </div>
          {/* field one */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item Purchase Code</span>
            </label>
            <input
              onChange={submitData}
              type="text"
              placeholder="Item code"
              name="purchaseCode"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Verification;
