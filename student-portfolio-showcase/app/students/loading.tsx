export default function StudentsLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 skeleton"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto skeleton"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card h-full">
            <div className="h-64 bg-gray-200 skeleton"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2 skeleton"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-4 skeleton"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 skeleton"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 skeleton"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-16 skeleton"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16 skeleton"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16 skeleton"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-32 skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
