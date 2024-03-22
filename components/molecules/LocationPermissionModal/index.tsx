import React, { useState } from 'react'

import Cookies from 'js-cookie'

import { Model } from '..'

interface LocationData {
  latitude: number
  longitude: number
}

interface LocationComponentProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

async function requestLocationPermission(): Promise<LocationData | null> {
  try {
    const lastPermissionTime = Cookies.get('lastPermissionTime')
    const lastPermissionTimestamp = lastPermissionTime
      ? parseInt(lastPermissionTime, 10)
      : 0
    const now = Date.now()
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

    const isPermissionRecent = now - lastPermissionTimestamp < SEVEN_DAYS

    if (!isPermissionRecent) {
      // Request permission
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation'
      })

      if (permissionStatus.state === 'granted') {
        const location = await getLocation()
        if (location) {
          Cookies.set('lastPermissionTime', now.toString())
          return location
        }
      } else if (permissionStatus.state === 'prompt') {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          }
        )
        const location = getLocationFromPosition(position)
        if (location) {
          Cookies.set('lastPermissionTime', now.toString())
          return location
        }
      } else {
        // Permission denied or unavailable
        Cookies.set('lastPermissionTime', 'denied')
      }
    } else {
      // Permission already granted within last 7 days
      return getLocationFromCache()
    }
  } catch (error) {
    console.error('Error requesting permission:', error)
    return null
  }
  return null
}

async function getLocation(): Promise<LocationData | null> {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    )
    return getLocationFromPosition(position)
  } catch (error) {
    console.error('Error getting location:', error)
    return null
  }
}

function getLocationFromPosition(
  position: GeolocationPosition
): LocationData | null {
  const { coords } = position
  return {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
}

function getLocationFromCache(): LocationData | null {
  const lastPermissionTime = Cookies.get('lastPermissionTime')
  if (lastPermissionTime === 'denied') {
    alert('Location permission was denied previously.')
    return null
  }
  // You may implement additional logic here to handle cached location data if needed
  return null
}

const LocationComponentWithModal: React.FC<LocationComponentProps> = ({
  openModal,
  setOpenModal
}) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null)

  const handleGetLocation = async (allow: boolean) => {
    if (allow) {
      const location = await requestLocationPermission()
      if (location) {
        setLocationData(location)
      }
    } else {
      Cookies.set('lastPermissionTime', 'denied')
    }
    setOpenModal(false) // Fecha o modal após obter a localização ou informar que a permissão foi negada
  }

  return (
    <>
      {openModal && (
        <Model.Root>
          <Model.Body setOpen={setOpenModal}>
            <div>Voce permite usarmos ua localizaçaõ?</div>
            <button onClick={() => handleGetLocation(true)}>Sim</button>
            <button onClick={() => handleGetLocation(false)}>Não</button>
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

export default LocationComponentWithModal
