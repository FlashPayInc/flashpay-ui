import dayjs from "dayjs";
import millify from "millify";
import React from "react";
import { useSelector } from "react-redux";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AccountChart = ({ data = [] }) => {
  const xAxisFormatter = (value, index) => {
    return dayjs(value).format("MMM, DD");
  };

  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${dayjs(label).format(
            "MMM DD, YYYY"
          )}`}</p>
          <p className="label">{`Amount: ${
            !isNaN(payload[0]?.value) &&
            millify(payload[0]?.value, {
              precision: 2,
            })
          }`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={[
            ...data.map(item => {
              return {
                ...item,
                amount: Number(item.amount),
              };
            }),
          ]}
          margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="created_at" tickFormatter={xAxisFormatter} />
          <YAxis
            type="number"
            // domain={["dataMin", "dataMax + 0.5"]}
            tickFormatter={(value, index) =>
              millify(Number(value), {
                precision: 2,
              })
            }
          />

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ border: "none", outline: "none" }}
            // cursor={{ stroke: "#006174", strokeWidth: 2 }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AccountChart;
