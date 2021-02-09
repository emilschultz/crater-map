import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const nasaApiKey = process.env.NASA_API_KEY;

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
      type: 'bar',
      marker: {
        color: ['#00b894', '#e17055', '#0984e3', '#fab1a0', '#e84393', '#ffeaa7', '#6c5ce7', '#ff7675',   '#fd79a8', '#fdcb6e', '#00cec9', '#d63031', '#e84393', '#a29bfe', '#00b894', '#e17055', '#0984e3', '#fab1a0', '#e84393', '#ffeaa7', '#6c5ce7', '#ff7675',   '#fd79a8']
      }
    };
    // Browse the overall Asteroid data-set
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${nasaApiKey}`)
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
    })
    .catch(error => {
      console.log(error)
    })
    }, [])

    // -------------------------------------------------------------------

    // BUBBLE CHART ASTEROIDS NEAREST EARTH TODAY
    const [ bubbleChartState, setBubbleChartState ] = useState({
      data: [],
      layout: {
        width: 920,
        height: 920,
        title: 'Asteroids nearest earth today'
      },
      frames: [],
      config: {}
    });

    useEffect(() => {
      let newBubbleChartData = {
        x: [],
        y: [],
        text: [],
        mode: 'markers',
        marker: {
          size: [],
          color: ['#00b894', '#e17055', '#0984e3', '#fab1a0', '#e84393', '#ffeaa7', '#6c5ce7', '#ff7675', '#fd79a8', '#fdcb6e', '#00cec9', '#d63031', '#e84393', '#a29bfe'],

        }
      };

      // GET TODAY'S DATE
      let today = new Date();
      let yyyy = String(today.getFullYear());
      let mm = String(today.getMonth() + 1);
      let dd = String(today.getDate());

      today = yyyy + '-' + mm + '-' + dd;

      fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today + '&end_date=' + today + '&api_key=7fX5ch29dBRLQKQVxaI7twG9p1ZVmeNY1dSVaSsg')
      .then(response => response.json())
      .then(data => {
        const values = Object.values(data.near_earth_objects)
        values[0].forEach(object => {
          newBubbleChartData.x.push(object.close_approach_data.[0].close_approach_date_full)
          newBubbleChartData.y.push(object.close_approach_data.[0].miss_distance.kilometers)
          newBubbleChartData.marker.size.push(object.estimated_diameter.meters.estimated_diameter_min * 0.5)
          newBubbleChartData.text.push(object.close_approach_data.[0].close_approach_date_full)
        });


        let newBubbleChartState = {
          ...bubbleChartState,
          data: [newBubbleChartData]
        };

        setBubbleChartState(newBubbleChartState);
      })
      .catch(error => {
        console.log(error)
      })
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
        
        <Plot
        data={bubbleChartState.data}
        layout={bubbleChartState.layout}
        frames={bubbleChartState.frames}
        config={bubbleChartState.config}
        onInitialized={(figure) => setbubbleChartState(figure)}
        onUpdate={(figure) => setbubbleChartState(figure)}
        />

      </section>
    
    )
}


export default Asteroids;