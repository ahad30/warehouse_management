


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
} from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
    // Add more objects to reach a total of 30
    {
      name: 'Page G',
      uv: 1200,
      pv: 900,
      amt: 1400,
    },
    {
      name: 'Page H',
      uv: 990,
      pv: 750,
      amt: 1300,
    },
    {
      name: 'Page I',
      uv: 880,
      pv: 1100,
      amt: 1600,
    },
    {
      name: 'Page J',
      uv: 1350,
      pv: 920,
      amt: 1450,
    },
    {
      name: 'Page K',
      uv: 1230,
      pv: 980,
      amt: 1350,
    },
    {
      name: 'Page L',
      uv: 1575,
      pv: 1125,
      amt: 1800,
    },
    {
      name: 'Page M',
      uv: 990,
      pv: 1200,
      amt: 1550,
    },
    {
      name: 'Page N',
      uv: 1300,
      pv: 1080,
      amt: 1200,
    },
    {
      name: 'Page O',
      uv: 1125,
      pv: 850,
      amt: 1320,
    },
    {
      name: 'Page P',
      uv: 1020,
      pv: 680,
      amt: 1450,
    },
    {
      name: 'Page Q',
      uv: 890,
      pv: 720,
      amt: 1350,
    },
    {
      name: 'Page R',
      uv: 1240,
      pv: 960,
      amt: 1550,
    },
    {
      name: 'Page S',
      uv: 1140,
      pv: 850,
      amt: 1400,
    },
    {
      name: 'Page T',
      uv: 1450,
      pv: 1100,
      amt: 1700,
    },
    {
      name: 'Page U',
      uv: 970,
      pv: 880,
      amt: 1300,
    },
    {
      name: 'Page V',
      uv: 1130,
      pv: 760,
      amt: 1400,
    },
    {
      name: 'Page W',
      uv: 1320,
      pv: 960,
      amt: 1600,
    },
    {
      name: 'Page X',
      uv: 1230,
      pv: 850,
      amt: 1350,
    },
    {
      name: 'Page Y',
      uv: 1580,
      pv: 1120,
      amt: 1850,
    },
    {
      name: 'Page Z',
      uv: 930,
      pv: 780,
      amt: 1250,
    },
  ];
  
  
  
  
    
const ProductSaleBarChart = () => {


      return (
        
        
        <ComposedChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" barSize={20} fill="#F59E0B" />
          <Line type="monotone" dataKey="uv" stroke="#E697FF" />
        </ComposedChart>
      
       
      );
};

export default ProductSaleBarChart;

ProductSaleBarChart.demoUrl= 
"https://codesandbox.io/s/composed-chart-of-same-data-i67zd"