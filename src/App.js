import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

function App() {

  const [pageData, setPageData] = useState(null);

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
    </>
  )
};

export default App;