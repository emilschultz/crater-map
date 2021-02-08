import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox, { Popup } from 'mapbox-gl';

import SkeletonComponent from '../../components/SkeletonComponent';
import MapWrapper from '../../components/MapWrapper';
import TitleSection from '../../components/TitleSection';

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

      const longitude = marker.metadata.longitude
      const latitude = marker.metadata.latitude
      const title = marker.title
      const content = marker.content
      // const pin = marker.metadata.icon.url

        let popupContent = `
        <div>
          <h2>${title}</h2>
          <p>${content}</p>
        </div>
        `

        new Mapbox.Marker()
          
          .setLngLat([longitude, latitude])
          .flyTo([longitude, latitude])
          .setPopup(new Mapbox.Popup()
            .setHTML(popupContent))
          .addTo(map)
    })

    // BUTTON FOR EACH MARKER
    mapData.objects.forEach( marker => {
      return(
      <button>{marker.title}</button>
      )
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
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
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