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

export interface Horario {
  HORARIO: string
  URL_COMPRA: string
  IMAX: number
  '3D': number
  LEGENDADO: number
}

export interface Sala {
  SALA: string
  LEGENDA: string
  TIPO: string
  HORARIOS: Horario[]
}

export interface Cinema {
  DATA: string
  CINEMA: string
  ESTADO: string
  CIDADE: string
  ENDERECO: string
  NUMERO: string
  BAIRRO: string | null
  SALAS: { [key: string]: Sala }
}

export interface Programacao {
  [data: string]: {
    DATA: string
    TITULO: string
    CINEMAS: { [key: string]: Cinema }
  }
}

export interface Filme {
  filme: {
    programacao: Programacao
  }
}
