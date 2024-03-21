export const useGtag = () => {
  const dataLayerHome = (
    title: string,
    local: string,
    user_id_anonymous: string,
    page_url: string
  ) => {
    window.dataLayer?.push({
      event: 'home',
      city_id: local,
      user_id_anonymous: user_id_anonymous,
      page_url: page_url,
      page_title: title,
      property_title: 'Site'
    })
  }

  return dataLayerHome
}
