import { Suspense } from 'react';
import TestChild1 from './testChild1';
import TestChild2 from './testChild2';
import TestChild3 from './testChild3';
import TestChild1Suspense from './testChild1/loading';
import TestChild2Suspense from './testChild2/loading';
import TestChild3Suspense from './testChild3/loading';
import Transformer from './transformer';
import DownloadTesis from './button';
import Link from 'next/link';
import AxiosDownload from './axiosDownload';
import { cookies } from 'next/headers';


const TestParent = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value || '';


  return (
    <>
      <Transformer/>
      <Link href={`/test/api?id=${1}`} >Descargar con Link</Link>
      <DownloadTesis idTesis={1}/>
      <AxiosDownload idTesis={1} token={token}/>
      </>
  );
};

export default TestParent;
