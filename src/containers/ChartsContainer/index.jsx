import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Asteroids () {

  // BAR CHART - SOME KNOWN ASTEROIDS AND THEIR DIAMETER IN KILOMETERS
  const [ barChartState, setBarChartState ] = useState({
    data: [],
    layout: {
      width: 920,
      height: 640,
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
    fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + process.env.NASA_API_KEY)
    .then(response => response.json())
    .then(data => {
      data.near_earth_objects.forEach(object => {
        // console.log(object)
        newBarChartData.x.push(object.name_limited)
        newBarChartData.y.push(object.estimated_diameter.kilometers.estimated_diameter_max)
      });
      let newBarChartState = {
        ...barChartState,
        data: [newBarChartData],
      }
  
      setBarChartState(newBarChartState);
      // console.log(data)

    })
    .catch(error => {
      console.log(error)
    })
    }, [])

    // -------------------------------------------------------------------

    // NEAR EARTH OBJECTS BASED ON THEIR CLOSEST APPROACH DATE TO EARTH

    const [ bubbleChartState, setBubbleChartState ] = useState({
      data: [],
      layout: {
        width: 920,
        height: 540,
        title: 'Near earth objects, based on their approach date to earth'
      },
      frames: [],
      config: {}
    });

    useEffect(() => {
      let newBubbleChartData = {
        x: [],
        y: [],
        mode: 'markers',
        marker: {
          size: []
        }
      };

      // GET TODAY'S DATE
      let today = new Date();
      let yyyy = String(today.getFullYear());
      let mm = String(today.getMonth() + 1);
      let dd = String(today.getDate());

      today = yyyy + '-' + mm + '-' + dd;


      fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today + '&end_date=' + today + '&api_key=' + process.env.NASA_API_KEY)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // data.near_earth_objects.forEach(object => {
        //   console.log(object)
        });

      //   let newBubbleChartState = {
      //     ...bubbleChartState,
      //     data: [newBubbleChartData]
      //   };

      //   setBubbleChartState(newBubbleChartState);
      // })
      // .catch(error => {
      //   console.log(error)
      // })
    }, [])





    return(
      <section>

        <Plot
        data={barChartState.data}
        layout={barChartState.layout}
        frames={barChartState.frames}
        config={barChartState.config}
        onInitialized={(figure) => setBarChartState(figure)}
        onUpdate={(figure) => setBarChartState(figure)}
        />

      </section>
    
    )
}


export default Asteroids;