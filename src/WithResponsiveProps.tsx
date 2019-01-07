import * as React from 'react'
import MediaQueryManager from './MediaQueryManager'

export interface MediaQuerySetting<P> {
  query: string
  props: P
}

const reduceBits = (bits: number, isMatch: boolean, i: number) => {
  if (!isMatch) {
    return bits
  }

  return bits | matchBit(i)
}

const matchBit = (i: number) => Math.pow(2, i)

const WithResponsiveSettings = <P extends object>(settings: MediaQuerySetting<P>[] = []) => {
  return <K extends object>(WrappedComponent: React.ComponentType<P & K>) =>
    class ResponsiveProps extends React.Component<K> {
      state = { matches: 0 }
      queryManager: MediaQueryManager

      componentDidMount () {
        this.queryManager = new MediaQueryManager()

        const matches = settings
          .map(({ query }, i) =>
            this.queryManager.addListener(query, this.onChange(i), i)
          ).reduce(reduceBits, 0)

        this.setState({ matches })
      }

      componentWillUnmount () {
        this.queryManager.teardown()
      }

      onChange = (i: number) => {
        return (ev: MediaQueryListEvent) => {
          const isMatch = ev.matches
          const { matches } = this.state
          const bit = matchBit(i)
          const isSet = (matches & bit) !== 0

          if (isMatch === isSet) return

          this.setState({ matches: matches ^ bit })
        }
      }

      render = () => {
        const { matches } = this.state

        const rp: P = settings
          .filter((_, i) => (matches & matchBit(i)) !== 0)
          .reduce((tp, { props }) => ({ ...tp, ...props }), {} as P)

        return <WrappedComponent {...this.props} {...rp} />
      }
    }
}

export default WithResponsiveSettings
