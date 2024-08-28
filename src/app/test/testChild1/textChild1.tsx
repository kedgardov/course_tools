import fakeApiCall from '@utils/fakeApi';

const TestChild1Component = async () => {
    const data:any = await fakeApiCall();

    return (
        <div>
            <h2>Test Child 1</h2>
            <p>{data.data}</p>
        </div>
    );

};

export default TestChild1Component;
