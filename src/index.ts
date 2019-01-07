import { MediaQuerySetting } from './WithResponsiveProps'

export { default as MediaQueryManager } from './MediaQueryManager'
export { default as WithResponsiveProps, MediaQuerySetting } from './WithResponsiveProps'

export const mediaSetting = <P extends object>(
  query: string, props: P
): MediaQuerySetting<P> => ({ query, props })
