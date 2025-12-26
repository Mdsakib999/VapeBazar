const LoadingComponent = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-2">
                <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce"></div>
                <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce200"></div>
                <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce400"></div>
            </div>
        </div>
    );
};

export default LoadingComponent;
