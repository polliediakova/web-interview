import { useCallback, useRef } from 'react'

export function useDebouncedCallback(callback, delay) {
  let timeout = useRef()

  return useCallback(
    function (...args) {
      clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        clearTimeout(timeout.current)
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
