import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { TbChessKing } from "react-icons/tb";
import { useSelector } from "react-redux";

const DefaultSetting = () => {
  const { user } = useSelector((state) => state.auth);
  const [allcurency, setAllcurency] = useState([]);

  useEffect(() => {
    fetch("/currency.json")
      .then((res) => res.json())
      .then((data) => setAllcurency(data?.sort((a, b) => a.name.localeCompare(b.name))));
  }, []);

  const [taxName, setTaxName] = useState("VAT");
  const [isToggle, setIsToggle] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    
    if (isToggle) console.log("on")
    else console.log("off")
  };

  //   console.log(watch("taxation"))
  return (
    <div>
      {/* discount Fie;d */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* discount field */}
          <div className="">
            <label className="label" htmlFor="">
              Discount
            </label>
            <input
              className="input input-bordered w-full my-2"
              type="number"
              min={0}
              placeholder="discount price"
              name=""
              id=""
              {...register("discount", { required: true })}
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
              placeholder="discount price"
              name=""
              id=""
              {...register("shipping", { required: true })}
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
              {...register("taxation", { required: true })}
              className="w-full input input-bordered"
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
              className="input input-bordered w-full my-2"
              type="number"
              min={0}
              placeholder=" taxation price"
              name=""
              id=""
              {...register("taxation_rate", { required: true })}
            />
            {errors.shipping && <span>This field is required</span>}
          </div>

          {/* currency */}
          <div className="">
            <label className="label" htmlFor="currency">
              Currency
            </label>
            <select
              {...register("currency", { required: true })}
              className="input input-bordered"
              
            >
              <option value="">Select Currency</option>
              {allcurency &&
                allcurency?.map((item, index) => (
                  <option key={index}  value={item?.symbol}>
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

          
        </div>

        {/* email */}
        {user?.get_role?.role === "admin" && (
          <div>
            {/* toggle implement */}
            <div className="flex m-5 gap-x-3">
              <label htmlFor="">Email setting</label>
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
                    {...register("mail_mailer", { required: true })}
                  />
                  {errors.mail_mailer && <span>This field is required</span>}
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
                    {...register("mail_host", { required: true })}
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
                    {...register("mail_port", { required: true })}
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
                    {...register("mail_username", { required: true })}
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
                    {...register("mail_password", { required: true })}
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
                    {...register("mail_encryption", { required: true })}
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
                    {...register("mail_from_address", { required: true })}
                  />
                  {errors.mail_from_address && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex mt-3 justify-end"><input className="btn bg-[#0369a1] text-white btn-wide" type="submit" value="submit" /></div>
      </form>
    </div>
  );
};

export default DefaultSetting;
