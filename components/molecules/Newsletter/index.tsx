'use client'
import Cookies from 'js-cookie'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Style from './Newsletter.module.scss'

import { NewsletterFormSchema } from './Newsletter.schema'

import { Phone } from '@/utils/hooks/useMask'
import { postNewsletter } from '@/utils/server/requests'
import { zodResolver as ResolverZod } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { z } from 'zod'

import { Model } from '..'

export type INewsletterForm = z.infer<typeof NewsletterFormSchema>

interface INewsletterProps {
  isBg?: boolean
  isHorrizontal?: boolean
}

const Newsletter = ({ isBg, isHorrizontal }: INewsletterProps) => {
  const [loaging, setLoaging] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [viewSuccess, setViewSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, disabled }
  } = useForm<INewsletterForm>({
    resolver: ResolverZod(NewsletterFormSchema)
  })

  const onSubmit = async (data: INewsletterForm) => {
    if (!data.n_termos) return
    setLoaging(true)
    try {
      const res = await postNewsletter(data.n_name, data.n_email, data.n_phone)
      if (res.data.done) {
        setModal(true)
        setViewSuccess(true)
        Cookies.set('formNewsletter', 'true')
        reset()
      }
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status != 200) {
        setError(true)
        setViewSuccess(false)
      }
    } finally {
      setError(false)
      setLoaging(false)
    }
  }

  return (
    <>
      <section
        className={`${Style.newsletter} ${isBg ? Style.newsletterBg : ''}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${Style.gridNewsletter} ${isHorrizontal ? Style.gridNewsletterHorrizontal : ''}`}
        >
          <div className={Style.text}>
            <h2>Você ama cinema?</h2>
            Preencha seus dados e concorra a brindes e convites exclusivos
            Diamond
          </div>
          <div className={Style.inputNome}>
            <label htmlFor="">
              <input
                type="text"
                placeholder="Nome"
                id="n_name"
                {...register('n_name')}
              />
            </label>
            {errors.n_name && (
              <small className="text-error">{errors.n_name.message}</small>
            )}
          </div>
          <div className={Style.inputTelefone}>
            <label htmlFor="n_phone">
              <input
                id="n_phone"
                type="text"
                placeholder="Telefone"
                {...register('n_phone')}
                onChange={(e) =>
                  ((e.target as HTMLInputElement).value = Phone(
                    (e.target as HTMLInputElement).value
                  ))
                }
              />
            </label>
            {errors.n_phone && (
              <small className="text-error">{errors.n_phone.message}</small>
            )}
          </div>
          <div className={Style.inputEmail}>
            <label htmlFor="n_email">
              <input
                type="email"
                id="n_email"
                placeholder="E-mail"
                {...register('n_email')}
              />

              <button type="submit" disabled={disabled}>
                {loaging ? 'Carregando' : 'Enviar'}
              </button>
            </label>
            {errors.n_email && (
              <small className="text-error">{errors.n_email.message}</small>
            )}
          </div>
        </form>
        <label htmlFor="termos" className={Style.newsletterPopUpTermosFlex}>
          <input type="checkbox" id="termos" {...register('n_termos')} />
          <p>
            Li, e aceito as&nbsp;
            <Link href="/politica-de-privacidade">
              politicas de provacidade
            </Link>
            &nbsp;e&nbsp;
            <Link href="/termos-e-condicoes">Termos e condições</Link>
          </p>
          {errors.n_termos && (
            <small className="text-error">{errors.n_termos.message}</small>
          )}
        </label>
      </section>
      {modal && (
        <Model.Root>
          <Model.Body setOpen={() => setModal(!modal)}>
            <Model.Title>
              {viewSuccess && 'ENVIADO COM SUCESSO'}
              {error && 'PREENCHA AS INFORMAÇÕES CORRETAMENTE'}
            </Model.Title>
            <Model.Content>
              {viewSuccess && (
                <div className={Style.newsletterPopUpTermos}>
                  <p>
                    Agradeçemos seu interesse. Logo entraremos em contato com
                    novidades sobre nossos filmes.
                  </p>
                  <div className={Style.newsletterPopUpTermosFlex}>
                    <button onClick={() => setModal(!modal)}>Fechar</button>
                  </div>
                </div>
              )}
              {error && (
                <div className={Style.newsletterPopUpTermos}>
                  <p>Preencha corretamnte as infomações</p>
                  <div className={Style.newsletterPopUpTermosFlex}>
                    <button onClick={() => setModal(!modal)}>Fechar</button>
                  </div>
                </div>
              )}
            </Model.Content>
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

export default Newsletter
