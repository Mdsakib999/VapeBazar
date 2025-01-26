const LoadingComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

            {/* Animated Text */}
            <p className="text-lg font-medium text-gray-600 mt-6 animate-pulse">
                Loading, please wait...
            </p>
        </div>
    );
};

export default LoadingComponent;
