import { useEffect, useRef } from 'react'

export const useClickOutside = (handler: () => void) => {
  const domNode = useRef<any>()
  useEffect(() => {
    if (domNode.current) {
      const maybeHandler = (event: any) => {
        if (!domNode.current.contains(event.target)) {
          handler()
        }
      }
      document.addEventListener('mousedown', maybeHandler)
      return () => document.removeEventListener('mousedown', maybeHandler)
    }
    return
  })
  return domNode
}
