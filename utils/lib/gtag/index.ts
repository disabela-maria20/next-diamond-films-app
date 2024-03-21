import { useState } from 'react'

export const useGtag = () => {
  const [cidade, setCidade] = useState<string>('')
  async function getLocalizacao() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )

          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()

          setCidade(data.address.city)
        } catch (err) {
          console.log(err)
        }
      })
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }
  getLocalizacao()

  const dataLayerHome = (title: string, page_url: string) => {
    window.dataLayer?.push({
      event: 'home',
      user_id_anonymous: 'anonymous',
      city_id: cidade,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site'
    })
  }
  const dataLayerFichafilme = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string
  ) => {
    window.dataLayer?.push({
      event: 'ficha_filme',
      city_id: cidade,
      user_id_anonymous: 'anonymous',
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: 'Diamond Films - ' + title,
      property_title: 'Site',
      pagina_filme: 'Hub',
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre
    })
  }

  const dataLayerBannerClick = (
    title: string,
    page_url: string,
    banner_click_position: { x: number; y: number }
  ) => {
    window.dataLayer?.push({
      event: 'banner_click',
      city_id: cidade,
      user_id_anonymous: 'anonymous',
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: 'Diamond Films - ' + title,
      property_title: 'Site',
      banner_click_page: 'home',
      banner_click_content: 'Banner Filme: ' + title,
      banner_click_position: `${banner_click_position.x}, ${banner_click_position.y}`
    })
  }

  const dataLayerMovieTicket = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    theater_exhibitor: string,
    theater_id: string,
    theater_session: string
  ) => {
    window.dataLayer?.push({
      event: 'movie_tickets',
      city_id: cidade,
      user_id_anonymous: 'anonymous',
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site',
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      theater_exhibitor: theater_exhibitor,
      theater_id: theater_id,
      theater_session: theater_session
    })
  }
  return {
    dataLayerHome,
    dataLayerFichafilme,
    dataLayerBannerClick,
    dataLayerMovieTicket
  }
}
