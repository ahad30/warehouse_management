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
import Select from "react-select";
const TransferProduct = () => {
  UseTitle("Transfer Product");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [warehouse_id, setWarehouse_id] = useState();
  const { data: warehouseData } = useGetStoresQuery();
  const [fromWareHouseOptions, setFromWarehouseOptions] = useState([]);
  const [toWareHouseOptions, setToProductWarehouseOptions] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const { data: productsData } = useGetProductsQuery({
    pageNumber: 1,
    query: query,
    warehouse_id: warehouse_id,
  });
  const [productOptions, setProductOptions] = useState([]);

  const [addHistory, { isLoading, isError, error, isSuccess, data }] =
    useAddHistoryMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    let data = e.target;

    addHistory({
      from_warehouse_id: data?.from_warehouse_id.value,
      to_warehouse_id: data?.to_warehouse_id.value,
      product_ids: productsArray,
    });
  };

  /** Initializing from warehouse options */
  useEffect(() => {
    let options = warehouseData?.data?.map((warehouse, index) => {
      return { label: warehouse?.name, value: warehouse?.id };
    });
    setFromWarehouseOptions(options);
  }, [warehouseData]);

  /** Initializing to warehouse options */
  const handleWarehouseChange = (val) => {
    setQuery(null);
    let options = warehouseData?.data?.map((warehouse, index) => {
      if (val?.value != warehouse?.id) {
        return { label: warehouse?.name, value: warehouse?.id };
      } else {
        return { label: warehouse?.name, value: warehouse?.id, disabled: true };
      }
    });
    /** Fetching products */

    setWarehouse_id(val?.value);
    setToProductWarehouseOptions(options);
  };

  /** Initializing product options */
  useEffect(() => {
    let productsOption = productsData?.products?.data?.map((product, index) => {
      return { label: product?.product_name, value: product?.id };
    });
    setProductOptions(productsOption);
  }, [productsData, warehouse_id]);
  /** Disabling fromSelectorDisabler */

  const fromSelectorDisabler = (val) => {
    const valuesArray = val?.map((option) => option.value);
    setProductsArray(valuesArray);
    // console.log(productsArray);
    let fromSelector = document.querySelector("#from-selector");
    fromSelector.setAttribute("readonly", "true");
    fromSelector.setAttribute("disabled", "disabled");
  };
  /** find product using query */
  const findProductHandler = (event) => {
    let input = event.target.value;
    if (input.length > 2) {
      setQuery(input);
    }
  };

  /** Fetching data after shifting product */
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
      <h2 className="text-xl my-5 font-semibold">Transfer Product</h2>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border px-3 py-4 bg-gray-50">
          <div>
            <label className="input-group mb-2 font-medium">
              From Warehouse
            </label>

            <Select
              options={fromWareHouseOptions}
              className="w-full"
              onChange={handleWarehouseChange}
              id="from-selector"
              name="from_warehouse_id"
            />
          </div>
          <div>
            <label className="input-group mb-2 font-medium">To Warehouse</label>
            <Select
              options={toWareHouseOptions}
              className="w-full"
              isOptionDisabled={(option) => option.disabled}
              name="to_warehouse_id"
            />
          </div>
          <div>
            <label className="input-group mb-2 font-medium">
              Select Product
            </label>
            <Select
              options={productOptions}
              className="w-full"
              isMulti={true}
              onKeyDown={findProductHandler}
              onChange={fromSelectorDisabler}
              name="product_id[]"
            />
          </div>
        </div>
        <SubmitButton
          title={isLoading ? "Shifting..." : "Shift"}
          icon={<BiSolidDuplicate size={20} />}
          isLoading={isLoading}
        />
      </form>
    </DashboardBackground>
  );
};

export default TransferProduct;
