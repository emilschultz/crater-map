import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

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
      zoom: 2,
      pitch: 40,
      minZoom: 2
    })

    // NAVIGATION CONTROLS
    map.addControl(new Mapbox.NavigationControl());

    // DISABLE SCROLL ZOOM
    map.scrollZoom.disable();

    // 3D LAYER
    map.on('load', function () {
      map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
      });
      // TERRAIN LAYER
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.6 });
      // SKY LAYER
      map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0,.09],
      'sky-atmosphere-sun-intensity': 90
      }
      });
    });

    // RENDER MARKERS FROM COSMIC DATA
    mapData.objects.map( marker => {

      const longitude = marker.metadata.longitude
      const latitude = marker.metadata.latitude
      const title = marker.title
      const content = marker.content
      const markerImage = marker.metadata.icon.url

        // CUSTOM MARKER
        let customMarker = document.createElement('div');
        customMarker.style.backgroundImage = `url(${markerImage})`
        customMarker.style.backgroundSize = '40px'
        customMarker.style.width = '40px';
        customMarker.style.height = '40px';
        customMarker.style.display = 'block';
        customMarker.style.cursor = 'pointer';

        // FLT TO MARKER LOCATION ON CLICK
          customMarker.addEventListener('click', () => {
          map.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            speed: .8,
            curve: .8
          })
        })

        // THE POPUP
        let popupContent = `
          <h2>${title}</h2>
          <p>${content}</p>
        `
        const popup = new Mapbox.Popup().setHTML(popupContent)
        new Mapbox.Marker(customMarker, {
          anchor: 'bottom'
        })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map)
    })    
  }
}, [mapData]);

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }

  const renderPage = () => {
    return(
      <>
        <MapWrapper>
        <div style={{height: '100%', width: '100%'}} ref={mapElement}></div>
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