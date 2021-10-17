import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Stockchart = () => {
  const data = useSelector((state) => state.inventory.inventory);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="item_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sku" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Stockchart;
