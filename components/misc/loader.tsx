interface LoaderInterface {
  text: string
}

export default function Loader(props: LoaderInterface) {
  const { text } = props;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-blue-600 mb-5 text-6xl">
        <i className="fas fa-circle-notch fa-spin"/>
      </span>
      <span className="text-gray-500">{ text }</span>
    </div>
  )
}
