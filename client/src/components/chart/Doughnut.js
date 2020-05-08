import React from 'react'
import { Doughnut as Grafico } from 'react-chartjs-2'

const Doughnut = ({ labels, data, backgroundColor, title }) => {
    return (
        <div>
            <Grafico
                data={{
                    labels,
                    datasets: [
                        {
                            label: title,
                            data,
                            backgroundColor
                        }
                    ]
                }}
            />

        </div>
    );
};

export default Doughnut;