/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface FetchState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

const useFetch = <T>() => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false
  })

  const request = useCallback(
    async (
      url: string,
      method: string = 'GET',
      options?: AxiosRequestConfig
    ) => {
      setState((prevState) => ({ ...prevState, loading: true }))
      try {
        const response: AxiosResponse<T> = await axios.request<T>({
          url,
          method,
          ...options
        })
        setState({ data: response.data, error: null, loading: false })
        return response
      } catch (error: any) {
        setState({ data: null, error: error.message || '', loading: false })
        throw error
      }
    },
    []
  )

  return { ...state, request }
}

export default useFetch
