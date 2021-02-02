import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import Plot from 'react-plotly.js';

// COMPONENTS
import SkeletonComponent from './components/SkeletonComponent'


function App() {

  const [pageData, setPageData] = useState(null);
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

  let map = null;
  const mapElement = useRef(null)
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

    // COSMIC
    useEffect(() => {
      const client = new Cosmic()
      const bucket = client.bucket({
        slug: process.env.BUCKET_SLUG,
        read_key: process.env.READ_KEY
      });

      bucket.getObject({
        slug: 'crater-map',
        props: 'slug,title,content'
      })
      .then(data => {
        setPageData(data.object);
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    // MAPBOX
    useEffect(() => {
      map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [12.567707560916299, 55.68859077933342],
        zoom: 13
      })
    }, [pageData])

    

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }
  
  const renderPage = () => {
    return(  
      <main>
        <h1>{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{__html: pageData.content}} />
        <Plot
          data={chartState.data}
          layout={chartState.layout}
          frames={chartState.frames}
          config={chartState.config}
          onInitialized={(figure) => setChartState(figure)}
          onUpdate={(figure) => setChartState(figure)}
        />
      </main>
    ) 
  }


  return (
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
      <div style={{height: '84vh'}} ref={mapElement}></div>
    </>
  )
};

export default App;