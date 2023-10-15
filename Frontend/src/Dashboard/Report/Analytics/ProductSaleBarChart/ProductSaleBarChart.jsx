import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Import a query to fetch sales data
import { useGetRevenueAndSellByDateQuery } from "../../../../features/Dashboard/dashboardSummary";

const ProductSaleBarChart = () => {
  // Fetch sales data using the defined query
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
          {/* Define a CartesianGrid to display grid lines */}
          <CartesianGrid stroke="#f5f5f5" />

          {/* Define the XAxis to display data points along the X-axis */}
          <XAxis dataKey="issue_date" scale="band" />

          {/* Define the YAxis to display data points along the Y-axis */}
          <YAxis />

          {/* Define a Tooltip to display information on hover */}
          <Tooltip />

          {/* Define a Legend to label data elements */}
          <Legend />

          {/* Define a Bar chart to represent sales data */}
          <Bar dataKey="sells" barSize={20} fill="#F59E0B" />

          {/* Define a Line chart to represent sales data with a line */}
          <Line type="monotone" dataKey="sells" stroke="#E697FF" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSaleBarChart;
