import React from 'react';

import SkeletonStyle from '../SkeletonStyle';
import Heading from '../Heading';

const SkeletonComponent = () => {
  return(
      <SkeletonStyle>
        <h1>Loading...</h1>
      </SkeletonStyle>
  )
}

export default SkeletonComponent;
