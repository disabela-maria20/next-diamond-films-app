import Style from './Newsletter.module.scss'

const Newsletter = () => {
  return (
    <div className="container">
      <section className={Style.newsletter}>
        <form className={Style.gridNewsletter}>
          <div className={Style.text}>
            Preencha seus dados e fique por dentro das nossas novidades, ações
            promocionais dos filmes e descontos exclusivos!
          </div>
          <div className={Style.inputNome}>
            <input type="text" placeholder="Nome" />
          </div>
          <div className={Style.inputTelefone}>
            <input type="text" placeholder="Telefone" />
          </div>
          <div className={Style.inputEmail}>
            <input type="text" placeholder="E-mail" />
            <button>Enviar</button>
          </div>
          <div className={Style.icon}>
            <img src="/img/carta.png" alt="" />
          </div>
        </form>
      </section>
    </div>
  )
}

export default Newsletter
