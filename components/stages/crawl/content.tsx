export default function ContentSection(props) {
  const { title, icon, subtitle } = props;

  return (
    <>
      <span className="text-3xl text-blue-600">
        { title }
      </span>
      <span className="text-blue-600 text-6xl my-5">
        <i className={icon} />
      </span>
      <span className="text-gray-500 text-center">
        { subtitle }
      </span>
    </>
  )
}
