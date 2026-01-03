export default function Container({children}) {
  return (
    <div className="py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {children}
        </div>
    </div>
  )
}
