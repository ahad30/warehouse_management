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

  const [settings, setSettings] = useState({});
  const [mailCredentials, setMailCredentials] = useState({});

  // Set up form handling with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  // Set the email toggle state based on the query result
  useEffect(() => {
    if (settingsData?.settings?.mail_option === "on") {
      setIsToggle(true);
    } else {
      setIsToggle(false);
    }

    const settings = settingsData?.settings;
    const mailCredentials = settingsData?.mailCredentials;

    setSettings(settings);
    setMailCredentials(mailCredentials);
  }, [
    settingsData,
    settingsData?.settings,
    settingsData?.mailCredentials,
    updateSettingData,
    error,
    isError,
    isLoading,
    isSuccess,
  ]);

  useEffect(() => {
    if (settingsData?.settings) {
      setValue("discount", settingsData?.settings?.discount);
      setValue("shipping", settingsData?.settings?.shipping);
      setValue("taxation", settingsData?.settings?.taxation);
      setValue("tax_value", settingsData?.settings?.tax_value);
      setValue("currency", settingsData?.settings?.currency);
      setValue("footer_note", settingsData?.settings?.footer_note);
    }

    if (settingsData?.mailCredentials) {
      setValue("mailer", settingsData?.mailCredentials?.mailer);
      setValue(
        "mail_encryption",
        settingsData?.mailCredentials?.mailer_encryption
      );
      setValue("mail_host", settingsData?.mailCredentials?.mailer_host);
      setValue("mail_password", settingsData?.mailCredentials?.mailer_password);
      setValue("mail_port", settingsData?.mailCredentials?.mailer_port);
      setValue("mail_username", settingsData?.mailCredentials?.mailer_username);
      setValue(
        "mail_address",
        settingsData?.mailCredentials?.mailer_from_address
      );
    }
  }, [
    settingsData,
    settingsData?.settings,
    settingsData?.mailCredentials,
    updateSettingData,
    error,
    isError,
    isLoading,
    isSuccess,
    setValue,
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
                <p className="font-bold"> Warning</p>
                <p>Check your SMTP Credential & generate an invoice to remove this message</p>
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
                    type="text"
                    min={0}
                    placeholder="Mail Port"
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
                    name=""
                    id=""
                    {...register("mail_address")}
                  />
                  {errors?.mail_address && <span>This field is required</span>}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex mt-3 justify-end">
          <input
            type="submit"
            className="input w-full input-bordered input-md my-2 lg:btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white cursor-pointer"
            value={isLoading ? "Saving..." : "Save"}
            required
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default DefaultSetting;
