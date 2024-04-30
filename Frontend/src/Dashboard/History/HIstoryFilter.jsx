import { func } from "prop-types";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import { useState } from "react";

const HIstoryFilter = ({
  setBrandId,
  setCategoryId,
  setWarehouseId
}) => {
  const { data: brandsData } = useGetBrandsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: storesData } = useGetStoresQuery();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Brand */}
      <label className="input-group">
        <span className="font-semibold text-sm">
          Brands<span className="text-red-500 p-0">*</span>
        </span>
        <select
          className="select select-bordered w-full"
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value={""}>Select Brand</option>
          {brandsData?.data?.map((data) => (
            <option value={data?.id} key={data?.id}>
              {data?.brand_name}
            </option>
          ))}
        </select>
      </label>
      {/* Category */}
      <label className="input-group">
        <span className="font-semibold text-sm">
          Category<span className="text-red-500 p-0">*</span>
        </span>
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value={""}>Select Category</option>
          {categoryData?.data?.map((data, idx) => (
            <option key={idx} value={data?.id}>
              {data?.category_name}
            </option>
          ))}
        </select>
      </label>
      
      {/*  warehouse */}
      <label className="input-group">
        <span className="font-semibold text-sm">
         Warehouse<span className="text-red-500 p-0">*</span>
        </span>
        <select
          // onChange={()=>}
          onChange={(e) => setWarehouseId(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value={""}>Select Warehouse Info</option>
          {storesData?.data?.map((data) => (
            <option key={data?.id} value={data?.id}>
              {data?.name}
            </option>
          ))}
        </select>
      </label>

      {/* To warehouse */}
      {/* <label className="input-group">
        <span className="font-semibold text-sm">
          To Warehouse<span className="text-red-500 p-0">*</span>
        </span>
        <select
          // onChange={()=>}
          onChange={(e) => setToWarehouse(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value={""}>Select Warehouse Info</option>
          {storesData?.data?.map((data) => (
            <option key={data?.id} value={data?.id}>
              {data?.name}
            </option>
          ))}
        </select>
      </label> */}
    </div>
  );
};

export default HIstoryFilter;
HIstoryFilter.propTypes = {
  setBrandId: func,
  setCategoryId: func,
  setToWarehouse: func,
  setFromWarehouse: func,
};
