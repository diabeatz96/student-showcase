export default function StudentProfileLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Skeleton */}
        <aside className="lg:col-span-1">
          <div className="card">
            <div className="p-6">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 skeleton"></div>
              <div className="h-8 bg-gray-200 rounded mx-auto w-48 mb-2 skeleton"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-32 mb-6 skeleton"></div>
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-6 h-6 bg-gray-200 rounded skeleton"></div>
                <div className="w-6 h-6 bg-gray-200 rounded skeleton"></div>
                <div className="w-6 h-6 bg-gray-200 rounded skeleton"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded mb-6 skeleton"></div>
              <div className="border-t border-gray-200 pt-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3 skeleton"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded-full w-16 skeleton"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4 skeleton"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded skeleton"></div>
                <div className="h-4 bg-gray-200 rounded skeleton"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 skeleton"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded w-32 mb-6 skeleton"></div>
              <div className="h-96 bg-gray-200 rounded skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
