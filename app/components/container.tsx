const Container = ({ bgColor, children }: Container) => {
  return (
    <div className={`w-full flex flex-col items-center ${bgColor}`}>
      <div className="w-full desktop:w-maxwidth px-4">{children}</div>
    </div>
  )
}

export default Container
