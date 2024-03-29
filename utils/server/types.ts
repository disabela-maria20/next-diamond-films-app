export interface IFilmeResponse {
  id: number
  title: string
  slug: string
  originalTitle: string
  countryOrigin: string
  contentRating: string
  banner_logo: string
  duration: number
  synopsis: string
  shortSynopsis: string
  cast: string
  director: string
  genre_id: number
  genre: string
  age: string
  ageExplain: string
  releasedate: string
  premiereDate: string
  partnerCode: string
  status: string
  cover: string
  bannerMobile: string
  bannerDesktop: string
  color: string
  trailer: string
  socialCampaign: string
  videos: IFilmeResponseUrl[]
  images: IFilmeResponseUrl[]
  streaming: string[]
  created_at: string
}

export interface IFilmeResponseUrl {
  url: string
}

export interface IFilmesEstadosResponse {
  estados: IFilmesEstado[]
}
export interface IFilmesEstado {
  CIDADE: string
  ESTADO: string
}
export interface Session {
  date: string
  hour: string
  theaterName: string
  link: string
  technology: string
  isImax: boolean
  postalCode: string
  address: string
  lat: string
  lng: string
  addressComplement?: string
  number?: string
  sessions: Session[]
}
