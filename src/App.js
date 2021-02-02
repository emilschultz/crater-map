import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';


function App() {

  const [pageData, setPageData] = useState(null);

  let map;
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
        style: 'mapbox://styles/mapbox/streets-v11'
      })
    }, [])

  const renderSkeleton = () => {
    return(
      <p>Loading...</p>
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
      <div style={{height: '500px'}} ref={mapElement}></div>
    </>
  )
};

export default App;