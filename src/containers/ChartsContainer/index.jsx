import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Asteroids () {

  // BAR CHART
  const [ barChartState, setBarChartState ] = useState({
    data: [],
    layout: {
      width: 800,
      height: 400,
      title: 'Known Asteroids and their diameter in kilometers'
    },
    frames: [],
    config: {}
  })

  useEffect(() => {
    let newBarChartData = {
      x: [],
      y: [],
      type: 'bar'
    };
    // Browse the overall Asteroid data-set
    fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=7fX5ch29dBRLQKQVxaI7twG9p1ZVmeNY1dSVaSsg')
    .then(response => response.json())
    .then(data => {
      data.near_earth_objects.forEach(object => {
        console.log(object)
        newBarChartData.x.push(object.name_limited)
        newBarChartData.y.push(object.estimated_diameter.kilometers.estimated_diameter_max)
      });
      let newBarChartState = {
        ...barChartState,
        data: [newBarChartData],
      }
  
      setBarChartState(newBarChartState);
      console.log(data)

    })
    .catch(error => {
      console.log(error)
    })
    }, [])

    return(
      <>
        <Plot
        data={barChartState.data}
        layout={barChartState.layout}
        frames={barChartState.frames}
        config={barChartState.config}
        onInitialized={(figure) => setBarChartState(figure)}
        onUpdate={(figure) => setBarChartState(figure)}
      />
      </>
    )
}


export default Asteroids;