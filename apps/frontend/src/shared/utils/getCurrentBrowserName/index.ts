import { BrowserNames } from './model'

export const getCurrentBrowserName = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (/chrome/.test(userAgent)) {
    return BrowserNames.CHROME;
  } else if (/firefox/.test(userAgent)) {
    return BrowserNames.FIREFOX;
  } else if (/safari/.test(userAgent)) {
    return BrowserNames.SAFARI;
  } else if (/opera/.test(userAgent)) {
    return BrowserNames.OPERA;
  } else if (/msie/.test(userAgent) || (/mozilla/.test(userAgent) && !/firefox/.test(userAgent) && !/chrome/.test(userAgent) && !/safari/.test(userAgent) && !/opera/.test(userAgent))) {
    return BrowserNames.EDGE;
  } else {
    return null;
  }
}