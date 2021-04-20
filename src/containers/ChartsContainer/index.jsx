import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import ChartSection from '../../components/ChartSection';

const nasaApiKey = process.env.NASA_API_KEY;

function Asteroids () {

  // BAR CHART - SOME KNOWN ASTEROIDS AND THEIR DIAMETER IN KILOMETERS
  const [ barChartState, setBarChartState ] = useState({
    data: [],
    layout: {
      width: 920,
      height: 640,
      plot_bgcolor:'rgb(0, 0, 0)',
      paper_bgcolor:'rgb(0, 0, 0)',
      title: {
        text: 'Known Asteroids and their diameter in kilometers',
        font: {
          family: 'Arial',
          size: 24,
          color: 'rgb(200, 100, 40)'
        }
      },
      xaxis: {
        title: {
          text: 'ASTEROID NAME',
          font: {
            family: 'ARIAL',
            size: 14,
            color: 'rgb(200, 100, 40)'
          }
        },
        color: "rgb(200, 100, 40)",
      },
      yaxis: {
        title: {
          text: 'DIAMETER IN KILOMETERS',
          font: {
            family: 'ARIAL',
            size: 14,
          }
        },
        color: 'rgb(200, 100, 40)'

      }
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
        color: ['#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702', '#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702', '#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702', '#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702'],
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
        plot_bgcolor:'rgb(0, 0, 0)',
        paper_bgcolor:'rgb(0, 0, 0)',
        
        title: {
          text: 'Asteroids nearest earth today',
          font: {
            family: 'Arial',
            size: 24,
            color: 'rgb(200, 100, 40)'
          }
        },
        xaxis: {
          title: {
            text: 'TIMESTAMP',
            font: {
              family: 'Arial',
              size: 14,
              color: 'rgb(200, 100, 40)'
            }
          },
          color: 'rgb(200, 100, 40)',
        },
        yaxis: {
          title: {
            text: 'MISS DISTANCE IN KILOMETERS',
            font: {
              family: 'Arial',
              size: 14,
            }
          },
          color: 'rgb(200, 100, 40)'
        }
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
          color: ['#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702', '#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702', '#FF8E00', '#E54818', '#FF7F00', '#FF551B', '#FF8E00', '#FF6702']

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
      <ChartSection>

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

      </ChartSection>
    )
}

export default Asteroids;