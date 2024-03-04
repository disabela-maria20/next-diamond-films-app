import { Suspense } from 'react'
type Props = {
  children?: React.ReactNode
}

const PageCatalogo = ({ children }: Props) => {
  return <Suspense fallback="Carregando">{children}</Suspense>
}

export default PageCatalogo
