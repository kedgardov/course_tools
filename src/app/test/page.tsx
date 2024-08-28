import { Suspense } from 'react';
import TestChild1 from './testChild1';
import TestChild2 from './testChild2';
import TestChild3 from './testChild3';
import TestChild1Suspense from './testChild1/loading';
import TestChild2Suspense from './testChild2/loading';
import TestChild3Suspense from './testChild3/loading';

const TestParent = () => {

  return (
    <>
        <TestChild1/>
      <Suspense fallback={<TestChild2Suspense/>}>
        <TestChild2/>
      </Suspense>
     <Suspense  fallback={<TestChild3Suspense/>}>
        <TestChild3/>
      </Suspense>
    </>
  );
};

export default TestParent;
