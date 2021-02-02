import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
// COMPONENTS IMPORT
import SkeletonComponent from './components/SkeletonComponent'
import Chart from './components/Chart';



function App() {

  const [pageData, setPageData] = useState(null);

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
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [10.13980512713666, 53.39893116868396],
        zoom: 2,
        pitch: 45,
      })
      // CONTROLS (FULLSCREEN & NAVIGATION)
      map.addControl(new Mapbox.FullscreenControl());
      map.addControl(new Mapbox.NavigationControl());

      // CRATER MARKERS

      // BERRINGER CRATER
      const berringerMarker = new Mapbox.Marker(event)
      berringerMarker.setLngLat([-111.02226922824839, 35.028046414736714])
      berringerMarker.addTo(map)

      // WOLF CREEK CRATER
      const wolfCreekMarker = new Mapbox.Marker(event)
      wolfCreekMarker.setLngLat([127.7955367736068, -19.171854725200237])
      wolfCreekMarker.addTo(map)

      // AMGUID CRATER
      const amguidMarker = new Mapbox.Marker(event)
      amguidMarker.setLngLat([4.395014134448849, 26.087573417980202])
      amguidMarker.addTo(map)

      // PINGUALUIT CRATER
      const pingualuiMarker = new Mapbox.Marker(event)
      pingualuiMarker.setLngLat([-73.65996457312208, 61.27817154641245])
      pingualuiMarker.addTo(map)

      // KAALI CRATER
      const kaaliMarker = new Mapbox.Marker(event)
      kaaliMarker.setLngLat([22.669319690218423, 58.372753194660284])
      kaaliMarker.addTo(map)





      // 3D LAYER
      map.on('load', function () {
        map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
         
        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
        }
        });
        });

        
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
      </main>
    ) 
  }

  return (
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
      <div style={{height: '84vh'}} ref={mapElement}></div>
      <Chart />
    </>
  )
}

export default App;