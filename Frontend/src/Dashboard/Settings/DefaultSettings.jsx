import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const DefaultSettings = () => {
  return (
    <DashboardBackground>
      <div>
        {/* Company info */}
        <h2 className="text-2xl font-semibold my-5">Company Info</h2>
        <div>
          <form className="grid md:grid-cols-[2fr_2fr_2fr_2fr_1fr] gap-2">
            <input
              name="name"
              type="text"
              className="input input-bordered input-md my-2"
              required
              defaultValue={"Z-Eight Tech"}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered input-md my-2"
              required
              defaultValue={"z8tech@gmail.com"}
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="input input-bordered input-md my-2"
              defaultValue={"+8890182783633"}
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="input input-bordered input-md my-2"
              defaultValue={"Chittagong, Bangladesh"}
              required
            />
            <input
              type="submit"
              className="input input-bordered input-md my-2 bg-gray-600 text-white hover:bg-gray-600 hover:text-white cursor-pointer"
              // className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
              value={"Update Info"}
              required
            />
          </form>
        </div>
      </div>
      {/* QR Code Status */}
      <div className="flex gap-x-2 text-xl my-5">
        QR Code Status:
        <input type="checkbox" className="toggle toggle-md" checked />
      </div>
      {/* User profile */}
      <h2 className="text-2xl font-semibold my-5">User Profile</h2>
      <div className="grid md:grid-cols-[1fr_3fr] gap-10 mt-10 border rounded-md p-5">
        <div className="sm:border-r-2 w-[90%] md:w-[70%] mx-auto">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
              />
            </div>
          </div>
        </div>
        <form>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-md w-full my-2"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="role"
            type="text"
            placeholder="Role"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="zip_code"
            type="text"
            placeholder="Zip Code"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="city"
            type="text"
            placeholder="city"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="state"
            type="text"
            placeholder="state"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            type="submit"
            // className="input input-bordered input-md my-2"
            className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
            value={"Update Profile"}
            required
          />
        </form>
      </div>
    </DashboardBackground>
  );
};

export default DefaultSettings;
