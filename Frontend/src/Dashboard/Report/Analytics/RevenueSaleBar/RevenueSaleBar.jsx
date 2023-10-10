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
import { useGetRevenueAndSellByDateQuery } from "../../../../features/Dashboard/dashboardSummary";

const RevenueSaleBar = () => {
  const { data: revenue } = useGetRevenueAndSellByDateQuery();

  return (
    <div className="max-w-full h-[250px] lg:h-[400px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <ComposedChart
          width={1000}
          height={500}
          data={revenue?.dayWiseRevenue}
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
          <Bar dataKey="revenue"  barSize={20} fill="#165BAA" />
          <Line type="monotone" dataKey="revenue" stroke="#E697FF" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueSaleBar;
