import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  useGetDefaultSettingsQuery,
  useUpdateDefaultSettingsMutation,
} from "../../features/Settings/settingsApi";

const DefaultSetting = () => {
  // Retrieve user information from Redux state
  const { user } = useSelector((state) => state.auth);

  // Initialize state variables
  const [allCurrency, setAllCurrency] = useState([]);
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [
    updateDefaultSetting,
    { data: updateSettingData, error, isError, isLoading, isSuccess },
  ] = useUpdateDefaultSettingsMutation();

  // Fetch currency data from an external JSON file
  useEffect(() => {
    fetch("/currency.json")
      .then((res) => res.json())
      .then((data) =>
        setAllCurrency(data?.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }, []);

  // Initialize state variables
  const [isToggle, setIsToggle] = useState(false);
  const [mailWarning, setMailWarning] = useState(null);

  // Set up form handling with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    updateDefaultSetting({ ...data, mail_option: isToggle ? "on" : "off" });
  };

  // Display loading, error, and success messages using react-hot-toast
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (isError) {
      toast.error(error?.data?.message || error?.status, { id: 1 });
    }

    if (isSuccess) {
      toast.success(updateSettingData?.message, { id: 1 });
    }
    if (settingsData?.settings?.mail_credential_status === "inactive") {
      setMailWarning(true);
    }
  }, [
    settingsData,
    settingsData?.settings,
    updateSettingData,
    error,
    isError,
    isLoading,
    isSuccess,
  ]);

  // Extract settings and mail credentials from the query results
  const settings = settingsData?.settings;
  const mailCredentials = settingsData?.mailCredentials;

  // Set the email toggle state based on the query result
  useEffect(() => {
    if (settingsData?.settings?.mail_option === "on") {
      setIsToggle(true);
    } else {
      setIsToggle(false);
    }
  }, [
    settingsData,
    settingsData?.settings,
    updateSettingData,
    error,
    isError,
    isLoading,
    isSuccess,
  ]);

  return (
    <div>
      {/* Form for default settings */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Default settings form fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Discount field */}
          <div className="">
            <label className="label" htmlFor="">
              Discount (%)
            </label>
            <input
              className="input input-bordered w-full my-2"
              type="number"
              min={0}
              placeholder="Discount"
              name=""
              id=""
              defaultValue={settings?.discount ? settings.discount : ""}
              {...register("discount")}
            />
            {errors.discount && <span>This field is required</span>}
          </div>

          {/* Shipping field */}
          <div className="">
            <label className="label" htmlFor="">
              Shipping
            </label>
            <input
              className="input input-bordered w-full my-2"
              type="number"
              min={0}
              defaultValue={settings?.shipping ? settings.shipping : ""}
              placeholder="Shipping charge"
              name=""
              id=""
              {...register("shipping")}
            />
            {errors.shipping && <span>This field is required</span>}
          </div>

          {/* Taxation field */}
          <div className="">
            <label className="label" htmlFor="">
              Taxation
            </label>

            <select
              name="taxation"
              id="taxation"
              {...register("taxation")}
              className="w-full select select-bordered"
            >
              <option value={"VAT"}>VAT</option>
              <option value={"TAX"}>TAX</option>
              <option value={"SST"}>SST</option>
              <option value={"GST"}>GST</option>
              <option value={"PPN"}>PPN</option>
              <option value={"HST"}>HST</option>
            </select>

            {errors.taxation && <span>This field is required</span>}
          </div>

          {/* Taxation rate field */}
          <div className="">
            <label className="label" htmlFor="">
              {watch("taxation") ? watch("taxation") : "VAT"}
            </label>
            <input
              className="input input-bordered w-full"
              type="number"
              min={0}
              placeholder="Taxation"
              defaultValue={settings?.tax_value ? settings?.tax_value : ""}
              name=""
              id=""
              {...register("tax_value")}
            />
            {errors.tax_value && <span>This field is required</span>}
          </div>

          {/* Currency selection field */}
          <div>
            <label className="label" htmlFor="currency">
              Currency
            </label>
            <select
              {...register("currency")}
              className="select select-bordered w-full"
            >
              <option value="">Select Currency</option>
              {allCurrency &&
                allCurrency?.map((item, index) => (
                  <option key={index} value={item?.symbol}>
                    {item?.name}
                  </option>
                ))}
            </select>
            {errors.currency && (
              <span className=" mx-4 px-5 py-2 rounded-lg border border-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Footer note field */}
          <div className="">
            <label className="label" htmlFor="">
              Footer Note
            </label>
            <textarea
              name="footer_note"
              id=""
              className="input input-bordered w-full py-2"
              placeholder="Write Your Footer Note"
              defaultValue={settings?.footer_note ? settings?.footer_note : ""}
              {...register("footer_note")}
            ></textarea>
            {errors?.footer_note && <span>This field is required</span>}
          </div>
        </div>

        {/* Email settings (only for admin users) */}
        {user?.get_role?.role === "admin" && (
          <div>
            {/* Toggle for email settings */}
            <div className="flex m-5 gap-x-3">
              <label htmlFor="">Email Sending Setting</label>
              <input
                type="checkbox"
                className="toggle"
                checked={isToggle}
                onChange={() => setIsToggle(!isToggle)}
              />
            </div>
            {mailWarning && (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                role="alert"
              >
                <p className="font-bold">Be Warned</p>
                <p>Smtp credentials are wrong</p>
              </div>
            )}
            {/* Email settings form fields */}
            {isToggle && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="">
                  <label className="label" htmlFor="">
                    Mailer
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mailer"
                    defaultValue={
                      mailCredentials?.mailer ? mailCredentials?.mailer : ""
                    }
                    name=""
                    id=""
                    {...register("mailer")}
                  />
                  {errors.mailer && <span>This field is required</span>}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mailer host
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mailer host"
                    defaultValue={
                      mailCredentials?.mail_host
                        ? mailCredentials?.mail_host
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_host")}
                  />
                  {errors.mail_host && <span>This field is required</span>}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mail Port
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="number"
                    min={0}
                    placeholder="Mail Port"
                    defaultValue={
                      mailCredentials?.mail_port
                        ? mailCredentials?.mail_port
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_port")}
                  />
                  {errors.mail_port && <span>This field is required</span>}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mail Username
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mail Username"
                    defaultValue={
                      mailCredentials?.mail_username
                        ? mailCredentials?.mail_username
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_username")}
                  />
                  {errors.username && <span>This field is required</span>}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mail Password
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="password"
                    min={0}
                    placeholder="Mail Password"
                    defaultValue={
                      mailCredentials?.mail_password
                        ? mailCredentials?.mail_password
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_password")}
                  />
                  {errors.mail_password && <span>This field is required</span>}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mail Encryption
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mail Encryption"
                    defaultValue={
                      mailCredentials?.mail_encryption
                        ? mailCredentials?.mail_encryption
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_encryption")}
                  />
                  {errors.mail_encryption && (
                    <span>This field is required</span>
                  )}
                </div>

                <div className="">
                  <label className="label" htmlFor="">
                    Mail From Address
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mail From Address"
                    defaultValue={
                      mailCredentials?.mail_address
                        ? mailCredentials?.mail_address
                        : ""
                    }
                    name=""
                    id=""
                    {...register("mail_address")}
                  />
                  {errors.mail_address && <span>This field is required</span>}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex mt-3 justify-end">
          <input
            className="btn bg-[#0369a1] text-white btn-wide"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default DefaultSetting;
