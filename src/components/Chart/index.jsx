import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const Chart = () => {

  const [chartState, setChartState] = useState({
    data: [{
      x: [1, 2, 3],
      y: [2, 6, 4],
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: 'blue'}
    }],
    layout: {
      width: 800,
      height: 400,
      title: 'Diagram'
    }, 
    frames: [],
    config: {}
  })
  
  return(
    <Plot
      data={chartState.data}
      layout={chartState.layout}
      frames={chartState.frames}
      config={chartState.config}
      onInitialized={(figure) => setChartState(figure)}
      onUpdate={(figure) => setChartState(figure)}
    />
  )
}

export default Chart