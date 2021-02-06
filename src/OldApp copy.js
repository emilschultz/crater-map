// import React, { useState, useEffect, useRef } from 'react';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from 'react-router-dom';

// import Cosmic from 'cosmicjs';
// import Mapbox from 'mapbox-gl';

// // COMPONENTS IMPORT
// import SkeletonComponent from './components/SkeletonComponent'
// import Chart from './components/Chart';

// // CONTAINERS IMPORT
// import HomeContainer from './containers/HomeContainer';
// import MapContainer from './containers/MapContainer'

// // STYLES IMPORT
// import GlobalStyle from './components/GlobalStyle/index';
// import MapWrapper from './components/MapWrapper/index';

// let map = null;

// function App() {

//   const [pageData, setPageData] = useState(null);

//   const mapElement = useRef(null)
//   Mapbox.accessToken = process.env.MAPBOX_API_KEY;

// // --------------------------------------------------------------------------------

//     // COSMIC
//     useEffect(() => {
//       const client = new Cosmic()
//       const bucket = client.bucket({
//         slug: process.env.BUCKET_SLUG,
//         read_key: process.env.READ_KEY
//       });

//       bucket.getObject({
//         slug: 'crater-map',
//         props: 'slug,title,content,metadata'
//       })
//       .then(data => {
//         console.log(data)
//         setPageData(data.object);
//       })
//       .catch(error => {
//         console.log(error)
//       })
//     }, [])

    

// // --------------------------------------------------------------------------------

//     // MAPBOX
//     useEffect(() => {
//       if(pageData !== null) {
//       map = new Mapbox.Map({
//         attributionControl: false,
//         container: mapElement.current,
//         style: 'mapbox://styles/mapbox/satellite-v9',
//         center: [10.13980512713666, 53.39893116868396],
//         zoom: 3,
//         pitch: 40,
//       })

      
//       // CONTROLS (FULLSCREEN & NAVIGATION)
//       map.addControl(new Mapbox.NavigationControl());

//       // CRATER MARKERS

//       // BERRINGER CRATER
//       const berringerMarker = new Mapbox.Marker(event)
//         berringerMarker.setLngLat([-111.02226922824839, 35.028046414736714])
//         berringerMarker.addTo(map)
  
//       // WOLF CREEK CRATER
//       const wolfCreekMarker = new Mapbox.Marker(event)
//       wolfCreekMarker.setLngLat([127.7955367736068, -19.171854725200237])
//       wolfCreekMarker.addTo(map)

//       // AMGUID CRATER
//       const amguidMarker = new Mapbox.Marker(event)
//       amguidMarker.setLngLat([4.395014134448849, 26.087573417980202])
//       amguidMarker.addTo(map)

//       // PINGUALUIT CRATER
//       const pingualuiMarker = new Mapbox.Marker(event)
//       pingualuiMarker.setLngLat([-73.65996457312208, 61.27817154641245])
//       pingualuiMarker.addTo(map)

//       // KAALI CRATER
//       const kaaliMarker = new Mapbox.Marker(event)
//       kaaliMarker.setLngLat([22.669319690218423, 58.372753194660284])
//       kaaliMarker.addTo(map)
      
    

//       // 3D LAYER
//       map.on('load', function () {
//         map.addSource('mapbox-dem', {
//         'type': 'raster-dem',
//         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//         'tileSize': 1024,
//         'maxzoom': 14
//         });
//         // TERRAIN LAYER
//         map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2 });
         
//         // SKY LAYER
//         map.addLayer({
//         'id': 'sky',
//         'type': 'sky',
//         'paint': {
//         'sky-type': 'atmosphere',
//         'sky-atmosphere-sun': [0.0, 0.0],
//         'sky-atmosphere-sun-intensity': 15
//         }
//         });
//       });
        
//     }
//   }, [pageData])

// // --------------------------------------------------------------------------------

// // --------------------------------------------------------------------------------
    
//   // FLYTO CRATERS

//   const flyToBerringer = () => {
//     map.flyTo({
//       center: [-111.02226922824839, 35.028046414736714],
//       zoom: 15,
//       speed: 0.6,
//       curve: 1.5,
//       essential: true
//     })
//   }

//   const flyToWolfCreek = () => {
//     map.flyTo({
//       center: [127.7955367736068, -19.171854725200237],
//       zoom: 15,
//       speed: 0.6,
//       curve: 1.5,
//       essential: true
//     })
//   }

//   const flyToAmguid = () => {
//     map.flyTo({
//       center: [4.395014134448849, 26.087573417980202],
//       zoom: 16,
//       speed: 0.6,
//       curve: 1.5,
//       essential: true
//     })
//   }

//   const flyToPingualuit = () => {
//     map.flyTo({
//       center: [-73.65996457312208, 61.27817154641245],
//       zoom: 13,
//       speed: 0.6,
//       curve: 1.5,
//       essential: true 
//     })
//   }

//   const flyToKaali = () => {
//     map.flyTo({
//       center: [22.669319690218423, 58.372753194660284],
//       zoom: 16,
//       speed: 0.6,
//       curve: 1.5,
//       essential: true
//     })
//   }

//   const zoomOut = () => {
//     map.flyTo({
//       center: [22.710411498987174, -0.91347531408414456],
//       zoom: 1.75,
//       speed: 0.8
//     })
//   }

// // --------------------------------------------------------------------------------

//   const renderSkeleton = () => {
//     return(
//       <SkeletonComponent />  
//       )
//   }
  
//   const renderPage = () => {
//     return(
//       <>
          
//             <Router>
//               <Switch>
//                 <Route path="/">
//                   <HomeContainer />
//                 </Route>
//                 <Route path="/">
//                   <MapWrapper />
//                 </Route>
//               </Switch>
//             </Router>

//         {/* <container>
//           <button onClick={flyToBerringer}>Berringer Crater</button>
//           <button onClick={flyToWolfCreek}>Wolf Creek Crater</button>
//           <button onClick={flyToAmguid}>Amguid Crater</button>
//           <button onClick={flyToPingualuit}>Pingualuit Crater</button>
//           <button onClick={flyToKaali}>Kaali Crater</button>
//           <button onClick={zoomOut}>Overview</button>
//         </container> */}
//       </>
//     ) 
//   }

//   return (
//     <>
//       <MapContainer />
//       <GlobalStyle/>
//       {(pageData === null) ? renderSkeleton() : renderPage()}
//       <MapWrapper>
//         <h1>CRATERS</h1>
//         <section>
//           <button onClick={flyToBerringer} className="navButtons">Berringer Crater</button>
//           <button onClick={flyToWolfCreek} className="navButtons">Wolf Creek Crater</button>
//           <button onClick={flyToAmguid} className="navButtons">Amguid Crater</button>
//           <button onClick={flyToPingualuit} className="navButtons">Pingualuit Crater</button>
//           <button onClick={flyToKaali} className="navButtons">Kaali Crater</button>
//           <button onClick={zoomOut} className="navButtons">Zoom out</button>
//         </section>
//         <div style={{height: '70%', width: '90%'}} ref={mapElement}></div>
//       </MapWrapper>
//       <Chart />
//     </>
//   )
// }

// export default App;