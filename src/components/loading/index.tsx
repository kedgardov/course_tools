const LoadingComponent = ({
    isLoading,
}:{
    isLoading: boolean,
}) => {
    return (
        <>
            {isLoading && (
                <p>Loading...</p>
            )}
        </>
    )
};

export default LoadingComponent;
