import React from 'react'

import { Logo, NavLink, RedesSociais } from '@/components/atoms'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="areaGridFooter">
          <div className="">
            <Logo logo="logo-BRANCO.png" />
          </div>
          <div>
            <h3>© 2024 Diamond Films Brasil Ltda.</h3>
            <p>Todos os direitos reservados.</p>
          </div>
          <div>
            <h3>Mapa do Site</h3>
            <NavLink area="footer" />
          </div>
          <div>
            <h3>Redes Sociais</h3>
            <RedesSociais />
          </div>
          <div>
            <h3>Filiais</h3>
            <RedesSociais />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
