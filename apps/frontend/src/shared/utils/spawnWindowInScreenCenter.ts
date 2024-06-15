export const spawnWindowInScreenCenter = (
  uri: string,
  windowName: string,
  win: Window,
  width: number = 800,
  height: number = 600,
) => {
  if (!win.top) return 

  const y = win.top.outerHeight / 2 + win.top.screenY - (height / 2)
  const x = win.top.outerWidth / 2 + win.top.screenX - (width / 2)

  const popup = window.open(
    uri,
    windowName,
    `toolbar=no, rel=noopener, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${y}, left=${x}`
  )

  return popup
}