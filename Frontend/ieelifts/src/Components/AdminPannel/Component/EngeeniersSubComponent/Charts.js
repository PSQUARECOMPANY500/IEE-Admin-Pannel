import React from 'react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceDot } from 'recharts';

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 3500,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3800,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 3300,
    "amt": 2000
  }
]


const Charts = () => {



  return (
<ResponsiveContainer  height={'100%'} width={'100%'}>
<AreaChart data={data}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8AC1DAD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F8AC1DAD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickLine={false} axisLine={false}  tick={{fill:'#000000',fillOpacity:'0.5',fontSize:'0.9rem'}}/>
        <YAxis tickLine={false} axisLine={false}  tick={{fill:'#000000',fillOpacity:'0.5',fontSize:'0.9rem'}} />
        <CartesianGrid stroke="#f5f5f5" strokeOpacity={0.5} />
        <Tooltip contentStyle={{ borderRadius: '8px' ,fontSize:'0.8rem  ',padding:'0.2rem 0.5rem'}} />
        <Area type="monotone" dataKey="pv" stroke="#F8AC1DAD" fillOpacity={2} fill="url(#colorPv)" strokeWidth={2}/>
      </AreaChart>

</ResponsiveContainer>
 
  )
};

export default Charts;
