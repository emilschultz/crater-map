import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import SkeletonComponent from '../../components/SkeletonComponent';
import MapContainer from '../MapContainer';
import ContentSection from '../../components/ContentSection';

function MapSectionContainer() {
  const [mapSectionData, setMapSectionData] = useState(null);

  // MAP SECTION FROM COSMIC
  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObject({
      slug: 'craters',
      props: 'slug,title,content'
    })
    .then(data => {
      setMapSectionData(data.object)
    })
    .catch(error => {
      console.log(error)
    });
  }, []);

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }

  const renderPage = () => {
    return(
      <>
          <ContentSection>
            <h1>{mapSectionData.title}</h1>
            <div dangerouslySetInnerHTML={{__html: mapSectionData.content}} />
          </ContentSection>
      </>
    )
  }

  return(
    <>
      {(mapSectionData === null) ? renderSkeleton() : renderPage()}
      <MapContainer />
    </>
  )
}

export default MapSectionContainer;