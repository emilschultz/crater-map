import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox, { Popup } from 'mapbox-gl';

import SkeletonComponent from '../../components/SkeletonComponent';
import MapWrapper from '../../components/MapWrapper';

let map = null;

function MapContainer() {
  const [mapData, setMapData] = useState(null);

  // MARKERS FROM COSMIC
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
      setMapData(data)
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
    if(mapData !== null) {
    map = new Mapbox.Map({
      attributionControl: false,
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-29.035194836132035, 0.28925621258486983],
      zoom: 1.5,
      pitch: 40,
    })
    // RENDER MARKERS FROM COSMIC METADATA
    mapData.objects.map( marker => {

      // let popup = document.createElement('div');
      // popup.className = 'popdenop';
      // newMarker.style.width = '20px';
      // newMarker.style.height = '30px';
      // newMarker.style.backgroundColor = 'yellow';

      const longitude = marker.metadata.longitude
      const latitude = marker.metadata.latitude
      const popupTitle = marker.title
      const popup = marker.content
      const newMarker = new Mapbox.Marker()
        newMarker.setLngLat([longitude, latitude])
        newMarker.addTo(map)

        new Mapbox.Popup()
        .setLngLat([longitude, latitude])
        .setHTML(popupTitle, popup)
        .addTo(map)  
        

    })

    // RENDER POP UP
    // mapData.objects.forEach( popup => {
    //   let popup = document.createElement('div');
    //   popup.style.width = '20px';
    //   popup.style.height = '30px';
    //   popup.style.backgroundColor = 'yellow';
      
    // });
    

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
}, [mapData])

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }

  

  const renderPage = () => {
    return(
      <>
        <MapWrapper>
        <div style={{height: '70%', width: '90%'}} ref={mapElement}></div>
        </MapWrapper>
      </>
    )
  }

  return(
    <>
      {(mapData === null) ? renderSkeleton() : renderPage()}
    </>
  )

  
}

export default MapContainer;