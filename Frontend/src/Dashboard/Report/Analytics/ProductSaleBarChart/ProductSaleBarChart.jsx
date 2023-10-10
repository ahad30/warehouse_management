import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetRevenueAndSellByDateQuery } from "../../../../features/Dashboard/dashboardSummary";

const ProductSaleBarChart = () => {
  const { data: sells } = useGetRevenueAndSellByDateQuery();

  return (
    <div className="max-w-full h-[250px] lg:h-[400px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <ComposedChart
          width={900}
          height={500}
          data={sells?.dayWiseRevenue}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="issue_date" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sells" barSize={20} fill="#F59E0B" />
          <Line type="monotone" dataKey="sells" stroke="#E697FF" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSaleBarChart;

ProductSaleBarChart.demoUrl =
  "https://codesandbox.io/s/composed-chart-of-same-data-i67zd";
