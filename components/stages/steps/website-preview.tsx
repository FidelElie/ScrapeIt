// ! Components
import Loader from "../../misc/loader";

export default function WebsitePreview(props) {
  const { preview, url, loading } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="overflow-ellipsis whitespace-nowrap text-gray-500">
          Website Preview
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {
          !loading ? (
            <img className="w-full h-auto" src={`data:image/png;base64, ${preview}`} />
          ) : (
            <Loader text="Loading Website Preview"/>
          )
        }
      </div>
    </>
  )
}
