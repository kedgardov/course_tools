const TestChild1Suspense = ({
    className,
}:{
    className: string,
}) => {
    return (
        <div className={`${className} bg-less-light text-less-light border rounded-xl animate-pulse`}>
        </div>
    );
};

export default TestChild1Suspense;
