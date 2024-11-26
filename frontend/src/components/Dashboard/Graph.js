import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Context } from '../../contexts/SharedState'

const Graph = () => {
    const states = useContext(Context);

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/graph')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error('Error fetching data: ', err);
            });
    }, [states.hostname]);

    return (
        <ResponsiveContainer width='110%' height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Graph;
