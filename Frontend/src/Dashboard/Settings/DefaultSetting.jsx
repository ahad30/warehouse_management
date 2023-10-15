import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  useGetDefaultSettingsQuery,
  useUpdateDefaultSettingsMutation,
} from "../../features/Settings/settingsApi";

const DefaultSetting = () => {
  const { user } = useSelector((state) => state.auth);
  const [allCurrency, setAllCurrency] = useState([]);
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [
    updateDefaultSetting,
    { data: updateSettingData, error, isError, isLoading, isSuccess },
  ] = useUpdateDefaultSettingsMutation();

  useEffect(() => {
    fetch("/currency.json")
      .then((res) => res.json())
      .then((data) =>
        setAllCurrency(data?.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }, []);

  const [isToggle, setIsToggle] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateDefaultSetting({ ...data, mail_option: isToggle ? "on" : "off" });
  };

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
  });

  const settings = settingsData?.settings;

  return (
    <div>
      {/* discount Fie;d */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* discount field */}
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

          {/* shipping field */}
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

          {/* tax field */}
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

          {/* taxation rate */}
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

          {/* currency */}
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

        {/* email */}
        {user?.get_role?.role === "admin" && (
          <div>
            {/* toggle implement */}
            <div className="flex m-5 gap-x-3">
              <label htmlFor="">Email Sending Setting</label>
              <input
                type="checkbox"
                className="toggle"
                checked={isToggle}
                onChange={() => setIsToggle(!isToggle)}
                // {...register("mail_option", )}
              />
            </div>

            {/* mail item */}
            {isToggle && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* mail */}
                <div className="">
                  <label className="label" htmlFor="">
                    Mailer
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="Mailer"
                    defaultValue={"smtp"}
                    name=""
                    id=""
                    {...register("mailer")}
                  />
                  {errors.mailer && <span>This field is required</span>}
                </div>

                {/* mail host */}
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

                {/* mail host */}
                <div className="">
                  <label className="label" htmlFor="">
                    Maile Port
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="number"
                    min={0}
                    placeholder="MAIL PORT"
                    name=""
                    id=""
                    {...register("mail_port")}
                  />
                  {errors.mail_port && <span>This field is required</span>}
                </div>

                {/* mail host */}
                <div className="">
                  <label className="label" htmlFor="">
                    MAIL USERNAME
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="MAIL USERNAME"
                    name=""
                    id=""
                    {...register("mail_username")}
                  />
                  {errors.username && <span>This field is required</span>}
                </div>

                {/* mail host */}
                <div className="">
                  <label className="label" htmlFor="">
                    MAIL PASSWORD
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="password"
                    min={0}
                    placeholder="MAIL PASSWORD"
                    name=""
                    id=""
                    {...register("mail_password")}
                  />
                  {errors.mail_password && <span>This field is required</span>}
                </div>

                {/* mail host */}
                <div className="">
                  <label className="label" htmlFor="">
                    MAIL ENCRYPTION
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="MAIL ENCRYPTION"
                    name=""
                    id=""
                    {...register("mail_encryption")}
                  />
                  {errors.mail_encryption && (
                    <span>This field is required</span>
                  )}
                </div>

                {/* mail host */}
                <div className="">
                  <label className="label" htmlFor="">
                    MAIL FROM ADDRESS
                  </label>
                  <input
                    className="input input-bordered w-full my-2"
                    type="text"
                    min={0}
                    placeholder="MAIL FROM ADDRESS"
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
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default DefaultSetting;
