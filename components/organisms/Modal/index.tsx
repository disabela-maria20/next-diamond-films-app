'use client'

import { useState, useEffect } from 'react'

import { Model, Newsletter } from '@/components/molecules'
import Cookies from 'js-cookie'

const Modal = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const modalShown = Cookies.get('modalShown')
    const modalClosed = Cookies.get('modalClosed')

    if (modalClosed == 'true') {
      setShowModal(false)
      return
    }
    if (!modalShown) {
      setShowModal(true)
      Cookies.set('modalShown', 'true', { expires: 7 })
      return
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
    // Defina uma cookie para indicar quando o modal foi fechado
    Cookies.set('modalClosed', 'true', { expires: 7 })
  }
  return (
    <>
      {showModal && (
        <Model.Root>
          <Model.Body setOpen={closeModal}>
            <Model.Title>VOCÊ ADORA UM BOM FILME?</Model.Title>
            <Model.Content>
              <Newsletter />
            </Model.Content>
            <Model.Footer />
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

export default Modal
