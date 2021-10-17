import React, { useState } from 'react';
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
  Line,
  ResponsiveContainer,
  LineChart,
} from 'recharts';

const RevenueChart = () => {
  const leads = useSelector((state) => state.lead.leads);
  const month = new Date().toLocaleString('en-US', {
    month: '2-digit',
  });
  const year = new Date().toLocaleString('en-US', {
    year: 'numeric',
  });
  var i;
  var data = new Array();
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  for (i = 0; i < month; i++) {
    data.push({
      name: months[i],
      revenue: 0,
    });
  }

  leads.forEach((element) => {
    const leadyear = new Date(element.updatedAt).toLocaleString('en-US', {
      year: 'numeric',
    });
    const leadmonth = new Date(element.updatedAt).toLocaleString('en-US', {
      month: '2-digit',
    });
    if (leadyear === year) {
      if (element?.convert) {
        console.log(element);
        data[leadmonth - 1].revenue +=
          element?.quantity * element?.item?.sale_price;
      }
    }
  });

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
