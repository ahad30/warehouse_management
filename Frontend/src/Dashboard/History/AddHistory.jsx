import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import { useAddHistoryMutation } from "../../features/History/historyApi";
import { useGetProductsQuery } from "../../features/Product/productApi";

const AddHistory = () => {
  UseTitle("Add History");
  const { register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: storesData } = useGetStoresQuery();
  const {data : productsData } = useGetProductsQuery();
  const [addHistory, { isLoading, isError, error, isSuccess, data }] =
  useAddHistoryMutation();
  const [selectedFromWarehouse, setSelectedFromWarehouse] = useState("");
  const [selectedToWarehouse, setSelectedToWarehouse] = useState("");

  const handleFromWarehouseChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFromWarehouse(selectedValue);
    if (selectedToWarehouse === selectedValue) {
      setSelectedToWarehouse("");
    }
  };

  const handleToWarehouseChange = (event) => {
    setSelectedToWarehouse(event.target.value);
  };
  
  const onSubmit = async (data) => {
    ('from_warehouse_id' , data?.from_warehouse_id);
    ('to_warehouse_id' , data?.to_warehouse_id);
    ('product_id' , data?.product_id);
    addHistory(data);
    console.log(data);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    if (isError) {
      const errorMessage = error?.data?.message || error?.status;
      toast.error(errorMessage, { id: 1 });
    }
    if (isSuccess && data?.status) {
      toast.success(data?.message, { id: 1 });
      return navigate("/dashboard/history");
    }
  }, [
    isLoading,
    isError,
    error,
    isSuccess,
    data?.message,
    navigate,
    data?.status,
    dispatch,
  ]);

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add History</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <label className="input-group">
        <span className="font-semibold">
          Warehouse<span className="text-red-500 p-0">*</span>
        </span>
        <select
          className="select select-bordered w-full"
          required
          value={selectedFromWarehouse}
          onChange={handleFromWarehouseChange}
        >
          <option value={""}>From Warehouse</option>
          {storesData?.data?.map((data) => (
            <option key={data?.id} value={data?.id}>
              {data?.name}
            </option>
          ))}
        </select>
      </label>
      <label className="input-group">
        <span className="font-semibold">
          Warehouse<span className="text-red-500 p-0">*</span>
        </span>
        <select className="select select-bordered w-full"
        value={selectedToWarehouse}
        onChange={handleToWarehouseChange}
        required>
          <option value={""}>To Warehouse</option>
          {storesData?.data?.filter((data) => data.id !== selectedFromWarehouse).map((data) => (
              <option key={data?.id} value={data?.id}>
                {data?.name}
              </option>
            ))}
        </select>
      </label>

        <label className="input-group">
            <span className="font-semibold">
              Product<span className="text-red-500 p-0">*</span>
            </span>
            <select
              className="select select-bordered w-full"
              
              {...register("product_id")}
            >
              <option value={""}>Select Product</option>
              {productsData?.data?.map((data) => (
                <option key={data?.id} value={data?.id}>
                  {data?.name}
                </option>
              ))}
            </select>
          </label>



          {/* <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Image<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="file"
              className="input input-bordered w-full py-2"
               
              {...register("image")}
            />
          </label> */}

          {/* <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              required
              {...register("category_name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">Description</span>
            <input
              type="text"
              placeholder="Category Description"
              className="input input-bordered w-full"
              {...register("description")}
            />
          </label> */}
        </div>
        <SubmitButton
          title={isLoading ? "Adding History..." : "Add History"}
          icon={<BiSolidDuplicate size={20} />}
          isLoading={isLoading}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddHistory;