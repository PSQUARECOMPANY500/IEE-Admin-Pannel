import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceDot } from 'recharts';

const data = [
  {
    "name": "Mon",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Tue",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Wed",
    "uv": 2000,
    "pv": 3500,
    "amt": 2290
  },
  {
    "name": "Thur",
    "uv": 2780,
    "pv": 3800,
    "amt": 2000
  },
  {
    "name": "Friday",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Sat",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
]


const Charts = () => {



  return (
    <ResponsiveContainer height={'95%'} width={'100%'} className='change-chart'>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8AC1DAD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F8AC1DAD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#000000', fillOpacity: '0.5', fontSize: '0.7rem' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#000000', fillOpacity: '0.5', fontSize: '0.7rem' }} />
        <CartesianGrid stroke="#f5f5f5" strokeOpacity={0.5} />
        <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '0.7rem  ', padding: '0.2rem 0.5rem' }} />
        <Area type="monotone" dataKey="pv" stroke="#F8AC1DAD" fillOpacity={2} fill="url(#colorPv)" strokeWidth={2} />
      </AreaChart>

    </ResponsiveContainer>

  )
};

export default Charts;
