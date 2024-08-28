import { Suspense } from 'react';
import TestChild1Component from './textChild1'
import TestChild1Suspense from './loading';

const TestChild1 = async () => {

    return (
       <Suspense fallback={<TestChild1Suspense className='w-24 h-8'/>}>
        <TestChild1Component/>
      </Suspense>
    );

};

export default TestChild1;

