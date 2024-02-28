import Style from './Footer.module.scss'

import { Logo, NavLink, RedesSociais } from '@/components/atoms'

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <div className="container">
        <div className={Style.areaGridFooter}>
          <div className={Style.areaLogo}>
            <Logo logo="logo-BRANCO.png" />
          </div>
          <div className={Style.areaCopy}>
            <h3>© 2024 Diamond Films Brasil Ltda.</h3>
            <p>Todos os direitos reservados.</p>
          </div>
          <div className={Style.areaMapaSite}>
            <h3>Mapa do Site</h3>
            <NavLink area="footer" />
          </div>
          <div className={Style.areaRedesSociais}>
            <h3>Redes Sociais</h3>
            <RedesSociais />
          </div>
          <div className={Style.areaFiliais}>
            <h3>Filiais</h3>
            <RedesSociais />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
