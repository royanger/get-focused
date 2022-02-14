import * as React from 'react'

export default function TimeTracker({
  tracker,
  setTracker,
  setEditing,
}: TimeTracker) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTracker(parseInt(e.currentTarget.id.split('-').slice(1).join('')))
    setEditing(true)
  }

  // use the map index as key -- there shouldn't be a reorder
  const inputs = [...Array(10)].map((_, index) => {
    const filled = tracker > index ? 'bg-purple' : 'bg-transparent'
    return (
      <div
        className={`border-2 border-purple rounded-full w-3 h-3 ${filled}`}
        onClick={e => handleClick(e)}
        id={`tracker-${index + 1}`}
        tabIndex={0}
        key={index}
      >
        <span className="sr-only">{index + 1}</span>
      </div>
    )
  })

  return <div className="grid grid-cols-5 gap-1">{inputs}</div>
}
