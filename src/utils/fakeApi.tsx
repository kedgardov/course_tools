interface fakeApiCallInterface {
  success: boolean;
  data: string;
};

const fakeApiCall= ():Promise<fakeApiCallInterface> => {
  return new Promise<fakeApiCallInterface>((resolve) => {
    setTimeout(() => {
      resolve({ success:true, data: 'Fake data response' });
    }, 5000); // 5 seconds delay
  });
};

export default fakeApiCall
