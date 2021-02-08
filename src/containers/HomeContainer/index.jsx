import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';
// COMPONENTS IMPORT
import SkeletonComponent from '../../components/SkeletonComponent'
// STYLES IMPORT
import TitleSection from '../../components/TitleSection';

function HomeContainer() {

  const [pageData, setPageData] = useState(null);

// --------------------------------------------------------------------------------

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

// --------------------------------------------------------------------------------

  const renderSkeleton = () => {
    return(
      <SkeletonComponent />  
      )
  }
  
  const renderPage = () => {
    return(  
      <>
        <TitleSection>
          <h1>{pageData.title}</h1>
          <div dangerouslySetInnerHTML={{__html: pageData.content}} />
          <a>☄️</a>
        </TitleSection>
      </>
    ) 
  }

  return (
    <>
      {/* <GlobalStyle/> */}
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )
}

export default HomeContainer;