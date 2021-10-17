import React, { useEffect, useState } from 'react';
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

const LeadsChart = ({ leads }) => {
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
      dispatched: 0,
      completed: 0,
      total: 0,
    });
  }

  leads?.forEach((element) => {
    const leadyear = new Date(element.updatedAt).toLocaleString('en-US', {
      year: 'numeric',
    });
    const leadmonth = new Date(element.updatedAt).toLocaleString('en-US', {
      month: '2-digit',
    });
    if (leadyear === year) {
      data[leadmonth - 1].total++;
      if (element.status === 'Completed') {
        data[leadmonth - 1].completed++;
      } else if (element.stage === 'Dispatched') {
        data[leadmonth - 1].dispatched++;
      }
    }
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" stackId="a" fill="#82ca9d" />
        <Bar dataKey="completed" stackId="a" fill="#8884d8" />
        <Bar dataKey="dispatched" stackId="a" fill="#54A3FF" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LeadsChart;
