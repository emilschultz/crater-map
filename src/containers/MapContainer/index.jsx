import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

import SkeletonComponent from '../../components/SkeletonComponent'

let map = null;

function MapContainer() {
  const [pageData, setPageData] = useState(null);

  // MARKERS/CRATERS FROM COSMIC
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObjects({
      type: 'markers',
      limit: 10,
      props: 'slug,title,content,metadata'
    })
    .then(data => {
      setPageData(data)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });
  }, []);

  // MAP FROM MAPBOX
  const mapElement = useRef(null)
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  useEffect(() => {
    if(pageData !== null) {
    map = new Mapbox.Map({
      attributionControl: false,
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [10.13980512713666, 53.39893116868396],
      zoom: 3,
      pitch: 40,
    })

    // NAVIGATION CONTROLS
    map.addControl(new Mapbox.NavigationControl());

    // 3D LAYER
    map.on('load', function () {
      map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 1024,
      'maxzoom': 14
      });
      // TERRAIN LAYER
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2 });
      // SKY LAYER
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
      
  }
}, [pageData])

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }

  const renderPage = () => {
    return(
      <>
        <h1>Hej</h1>
      </>
    )
  }
  return(
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )

  
}

export default MapContainer;