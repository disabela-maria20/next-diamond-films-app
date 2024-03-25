import { v4 as uuidv4 } from 'uuid'

export const useGtag = () => {
  const id = uuidv4()

  const getCidade =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('locationData')
      : null
  const cidade = getCidade?.replace(/"/g, '')

  const dataLayerHome = (title: string, page_url: string) => {
    window.dataLayer?.push({
      event: 'home',
      user_id_anonymous: id,
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
      user_id_anonymous: id,
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
      user_id_anonymous: id,
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
      user_id_anonymous: id,
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

  const dataLayerMovieStream = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    stream_name: string
  ) => {
    window.dataLayer?.push({
      event: 'movie_stream',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site',
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      stream_name: stream_name
    })
  }

  const dataLayerNewsletter = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    subscribe_location: string,
    pagina_filme: string
  ) => {
    window.dataLayer?.push({
      event: 'newsletter_subscribe',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site',
      pagina_filme: pagina_filme,
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      subscribe_location: subscribe_location
    })
  }
  const dataLayerMovieSubscribe = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    subscribe_location: string,
    pagina_filme: string
  ) => {
    window.dataLayer?.push({
      event: 'movie_subscribe',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site',
      pagina_filme: pagina_filme,
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      subscribe_location: subscribe_location
    })
  }

  const dataLayerContato = (title: string, page_url: string) => {
    window.dataLayer?.push({
      event: 'contato',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site'
    })
  }

  const dataLayerMovieSelect = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    movieposition: number
  ) => {
    window.dataLayer?.push({
      event: 'movie_select',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: 'Diamond Films - ' + 'Buscar',
      property_title: 'Site',
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      movieposition: movieposition
    })
  }

  const dataLayerMovieFilter = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    movieposition: number
  ) => {
    window.dataLayer?.push({
      event: 'movie_filter',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: 'Diamond Films - ' + 'Buscar',
      property_title: 'Site',
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre,
      movieposition: movieposition
    })
  }
  const dataLayerPlayTrailer = (
    title: string,
    page_url: string,
    moviename_original: string,
    moviegenre: string,
    pagina_filme: string
  ) => {
    window.dataLayer?.push({
      event: 'play_trailer',
      city_id: cidade,
      user_id_anonymous: id,
      page_url: 'https://diamondfilms.com.br/' + page_url,
      page_title: title,
      property_title: 'Site',
      pagina_filme: pagina_filme,
      moviename: title,
      moviename_original: moviename_original,
      movieid: '',
      moviegenre: moviegenre
    })
  }

  return {
    dataLayerHome,
    dataLayerFichafilme,
    dataLayerBannerClick,
    dataLayerMovieTicket,
    dataLayerMovieStream,
    dataLayerNewsletter,
    dataLayerMovieSubscribe,
    dataLayerContato,
    dataLayerMovieSelect,
    dataLayerPlayTrailer,
    dataLayerMovieFilter
  }
}
