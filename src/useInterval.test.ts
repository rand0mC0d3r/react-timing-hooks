import { renderHook } from '@testing-library/react-hooks'
import useInterval from './useInterval'

describe('useInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('calls interval handler every [n] milliseconds', () => {
    const intervalHandler = jest.fn()

    renderHook(() => useInterval(intervalHandler, 100))

    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    jest.advanceTimersByTime(100)
    expect(intervalHandler).toHaveBeenCalledTimes(3)
  })

  it("doesn't set interval if delay is null", () => {
    const intervalHandler = jest.fn()

    renderHook(() => useInterval(intervalHandler, null))

    jest.runAllTimers()
    expect(intervalHandler).toHaveBeenCalledTimes(0)
  })

  it('properly cleans up interval after unmount', () => {
    const intervalHandler = jest.fn()

    const { unmount } = renderHook(() => useInterval(intervalHandler, 500))

    unmount()
    jest.runAllTimers()

    expect(intervalHandler).toHaveBeenCalledTimes(0)
  })
})
