import { Suspense } from 'react';
import TestChild1 from './testChild1';
import TestChild2 from './testChild2';
import TestChild3 from './testChild3';
import TestChild1Suspense from './testChild1/loading';
import TestChild2Suspense from './testChild2/loading';
import TestChild3Suspense from './testChild3/loading';
import Transformer from './transformer';


const TestParent = () => {

  return (
    <>
      <Transformer/>
    </>
  );
};

export default TestParent;
