import { Suspense } from 'react'
type PageCatalogoProps = {
  children?: React.ReactNode
}

const PageCatalogo = ({ children }: PageCatalogoProps) => {
  return <Suspense fallback="Carregando">{children}</Suspense>
}

export default PageCatalogo
