import React from 'react'
import { Line as Grafico } from 'react-chartjs-2';

const Line = ({ labels, datasets }) => {
    return (
        <div>
            <Grafico
                data={{
                    labels,
                    datasets
                }}
            />

        </div>
    );
};

export default Line;