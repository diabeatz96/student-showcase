export function LiveDownload(mapValue?: string[]) {
  return (
<div className="w-full border-[2px] border-black">
                  <h1 className="text-center border-b-[1px] border-black">Live Download Creation</h1>
                  {mapValue && mapValue.length > 0 ? (
                    <div className="flex flex-col items-center p-4">
                      <p className="mb-2">Your live download options:</p>
                        <ul className="list-disc list-inside">
                            {mapValue.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    ) : (
                        <div className="p-4 text-center">
                          <p>No live download options available.</p>
                        </div>
                    )}
                </div>
    );
}