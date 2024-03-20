export const useGtag = () => {
  const pageViews = (title: string) => {
    window.google_tag_manager['G-DRBHT7HM35'].dataLayer.reset()
    window.dataLayer?.push({
      content_type: 'Microsite',
      page_title: title,
      property_title: title,
      site_country: 'BR'
    })
  }

  return pageViews
}
