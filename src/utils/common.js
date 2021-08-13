import defaultSettings from '@/settings'
export const getPageTitle = function (pageTitle) {
  const title = defaultSettings.title

  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
