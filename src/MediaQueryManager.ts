type MediaCallback = (ev: MediaQueryListEvent) => any

interface MediaMatcher {
  match: MediaQueryList
  callback: MediaCallback
}

type MediaMatchers = { [key: number]: MediaMatcher }

class MediaQuery {
  mediaMatchers: MediaMatchers = {}
  window: Window

  constructor (targetWindow?: Window) {
    this.window = targetWindow || window // eslint-disable-line no-undef
  }

  addListener = (query: string, callback: MediaCallback, key: number) => {
    if (!(this.window && typeof this.window.matchMedia === 'function')) {
      return
    }

    const match = this.window.matchMedia(query)
    match.addListener(callback)

    this.mediaMatchers[key] = { match, callback }

    return match.matches
  }

  removeListener = (key: number) => {
    const matcher = this.mediaMatchers[key]

    if (!matcher) return

    const { match, callback } = matcher

    match.removeListener(callback)
  }

  teardown = () =>
    Object.keys(this.mediaMatchers)
      .map(parseInt)
      .forEach(this.removeListener)
}

export default MediaQuery
