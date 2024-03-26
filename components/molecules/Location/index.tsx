'use client'
import React, { useState, useEffect } from 'react'

import Cookies from 'js-cookie'

import Style from './Location.module.scss'

import { Model } from '..'

interface LocationData {
  latitude: number
  longitude: number
}

const Location = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [locationData, setLocationData] = useState<LocationData | null>(null)

  useEffect(() => {
    const savedLocationData = localStorage.getItem('locationData')
    const savedLocationCoords = localStorage.getItem('locationCoords')
    const lastDeniedTime = window?.localStorage.getItem('lastDeniedTime')

    if (savedLocationData && savedLocationCoords) {
      const parsedLocationData = JSON.parse(savedLocationData) as LocationData
      setLocationData(parsedLocationData)
    } else {
      if (
        !lastDeniedTime ||
        Date.now() - parseInt(lastDeniedTime, 10) > 7 * 24 * 60 * 60 * 1000
      ) {
        setShowModal(true)
      }
    }
  }, [])

  const handleGetLocation = async (allow: boolean) => {
    let location: LocationData | null = null
    if (allow) {
      location = await requestLocationPermission()
    } else {
      const lastDeniedTime = window?.localStorage.getItem('lastDeniedTime')
      if (
        !lastDeniedTime ||
        Date.now() - parseInt(lastDeniedTime, 10) > 7 * 24 * 60 * 60 * 1000
      ) {
        Cookies.remove('lastPermissionTime')
        window?.localStorage.removeItem('lastDeniedTime')
      }
    }
    if (location) {
      setLocationData(location)

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          window?.localStorage.setItem(
            'locationCoords',
            JSON.stringify(location)
          )
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
            if (!response.ok) {
              throw new Error('Failed to fetch data')
            }
            const data = await response.json()
            window?.localStorage.setItem(
              'locationData',
              JSON.stringify(data.address.city)
            )
          } catch (err) {
            console.log(err)
          }
        })
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    }
    setShowModal(false)
  }

  return (
    <>
      {!locationData && showModal && (
        <Model.Root>
          <Model.Body setOpen={() => setShowModal(false)}>
            <div className={Style.locationModal}>
              <h2>Você permite usarmos sua localização?</h2>
              <div className={Style.modalButton}>
                <button onClick={() => handleGetLocation(true)}>Sim</button>
                <button onClick={() => handleGetLocation(false)}>Não</button>
              </div>
            </div>
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

async function requestLocationPermission(): Promise<LocationData | null> {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation'
    })
    if (
      permissionStatus.state === 'granted' ||
      permissionStatus.state === 'prompt'
    ) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        }
      )
      return getLocationFromPosition(position)
    } else {
      window?.localStorage.setItem('lastDeniedTime', Date.now().toString())
      Cookies.set('lastPermissionTime', 'denied')
      return null
    }
  } catch (error) {
    console.error('Error requesting permission:', error)
    return null
  }
}

function getLocationFromPosition(position: GeolocationPosition): LocationData {
  const { coords } = position
  return {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
}

export default Location
