'use client'

import Style from './SobreNos.module.scss'

import { Loading } from '@/components/atoms'
import { CardFilme, Newsletter } from '@/components/molecules'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
interface ISobreNosProps {
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}
const SobreNos = ({ listaFilmes }: ISobreNosProps) => {
  const { isMobile, isLoading } = useIsMobile()

  if (isLoading) return <Loading altura={true} />
  return (
    <section className={Style.SobreNos}>
      <div className="container" style={{ overflow: 'hidden' }}>
        <img src="/img/logo.webp" alt="logo" width={300} height={200} />
        <h1>SOBRE NÓS</h1>
        <div className={Style.grid}>
          <div>
            <p>
              A Diamond Films é a maior distribuidora independente da América
              Latina. Fundada em 2010, se destaca por distribuir os melhores
              filmes independentes da indústria cinematográfica. Atualmente, a
              empresa atua em sete países da América Latina: Argentina, Bolívia,
              Brasil, Chile, Colômbia, Peru e México.
            </p>
            <p>
              No Brasil desde 2013, a Diamond Films distribuiu títulos como
              &lsquo;Os Oito Odiados&lsquo;; &lsquo;Lion - Uma Jornada para
              Casa&lsquo;, &lsquo;Moonlight - Sob a Luz do Luar&lsquo;,
              &lsquo;Green Book - O Guia&lsquo;, &lsquo;Moonfall – Ameaça
              Lunar&lsquo;, &lsquo;No Ritmo do Coração&lsquo;,
              &lsquo;Spencer&lsquo;, &lsquo;A Pior Pessoa do Mundo&lsquo;,
              &lsquo;Órfã 2: A Origem&lsquo;, &lsquo;One Piece Film &lsquo;,
              &lsquo;Tudo em Todo o Lugar ao Mesmo Tempo&lsquo; e &lsquo;Fale
              Comigo&lsquo;.
            </p>
          </div>

          <div className={Style.video}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/exKaBNI_cHY?si=-VnLDLwYzXi5vGTk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <hr />
        {/* <h2 className={Style.titleOutline}>MISSÃO</h2>
        <p>
          Ser uma distribuidora que tem como melhor característica a qualidade
          de seus filmes, a partir de grandes produções e estrelas consagradas.
        </p>
        <h2 className={Style.titleOutline}>VISÃO</h2>
        <p>
          Ser reconhecida como líder no mercado de filmes independentes, sempre
          comprometidos com a sustentabilidade do negócio e com a satisfação de
          seus clientes.
        </p>
        <h2 className={Style.titleOutline}>VALORES</h2>
        <p>
          Enxergamos cada filme como um desafio único, para o qual destinamos
          uma atenção integral. Sempre com profissionalismo na distribuição e
          dedicação aos detalhes. Tudo isso sempre com muito respeito aos
          profissionais e clientes envolvidos
        </p>
        <hr /> */}
        <h2>VOCÊ AMA CINEMA?</h2>
        <Newsletter
          isHorrizontal={!isMobile ? true : false}
          isBg={true}
          title={false}
        />
        <h2 className={Style.titleLancamento}>
          LANÇAMENTOS
          <span>
            Confira os filmes em exibição e os que serão lançados em breve
            somente nos cinemas.
          </span>
        </h2>
        <CardFilme slide="lancamento" listaFilmes={listaFilmes} />
      </div>
    </section>
  )
}

export default SobreNos
