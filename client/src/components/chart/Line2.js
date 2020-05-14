import React from 'react'
import { Line as Grafico } from 'react-chartjs-2';

const Line2 = ({ labels, data, backgroundColor, title }) => {
    return (
        <div>
            <Grafico
                data={{
                    labels,
                    datasets: [
                        {
                            fill: false,
                            lineTension: 0.2,
                            pointRadius: 7,
                            pointHitRadius: 10,
                            label: title,
                            data,
                            backgroundColor
                        }
                    ]
                }}

                options={{
                    maintainAspectRatio: true

                }}
            />

        </div>
    );
};

export default Line2;