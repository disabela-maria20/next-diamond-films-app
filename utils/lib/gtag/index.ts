export const useGtag = () => {
  const pageViews = (title: string) => {
    window.dataLayer?.push({
      content_type: 'Microsite',
      page_title: title,
      property_title: title,
      site_country: 'BR'
    })
  }

  return pageViews
}
