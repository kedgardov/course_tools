import fakeApiCall from '@utils/fakeApi';

const TestChild2 = async () => {
    const data:any = await fakeApiCall();

    return (
        <div>
            <h2>Test Child 2</h2>
            <p>{data.data}</p>
        </div>
    );

};

export default TestChild2;
