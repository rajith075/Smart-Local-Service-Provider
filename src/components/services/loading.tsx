export default function ServicesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-full max-w-2xl mb-8"></div>
        
        {/* Filters Skeleton */}
        <div className="flex justify-between mb-6">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        
        {/* Results Count Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
        
        {/* Provider Cards Skeleton */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="flex space-x-2 mb-3">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}