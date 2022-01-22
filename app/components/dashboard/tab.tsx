import * as React from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'

export default function Tab({ title }) {
  return (
    <HeadlessTab as={React.Fragment}>
      {({ selected }) => (
        <button
          className={`px-8 py-4 text-lg text-white
            ${selected ? 'bg-purple' : 'bg-purple-100'}`}
        >
          {title}
        </button>
      )}
    </HeadlessTab>
  )
}
