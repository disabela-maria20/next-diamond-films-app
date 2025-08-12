/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Style from "./Filme.module.scss";
import { FreeMode, Scrollbar } from "swiper/modules";

import { Loading } from "@/components/atoms";
import { Model, Newsletter, Slide } from "@/components/molecules";
import { Sessoes } from "@/components/organisms";
import { useFormatarData } from "@/utils/hooks/useFormatarData/formatarData";
import useIsMobile from "@/utils/hooks/useIsMobile/isMobile";
import { useGtag } from "@/utils/lib/gtag";
import { IFilmeResponse } from "@/utils/server/types";
import { SwiperOptions } from "swiper/types";

import "react-lazy-load-image-component/src/effects/blur.css";
import useFilmeTextStatus from "@/utils/hooks/useFilmeTextStatus";

interface IFilmeProps {
  movie: {
    movie: IFilmeResponse;
  };
}

enum EStatus {
  LANCAMENTO = "lançamento",
  STREAMING = "streaming",
  INATIVO = "inativo",
}

const classificacoesIndicativas = [
  { idade: "Livre", cor: "#048f16" },
  { idade: "10", cor: "#0281df" },
  { idade: "12", cor: "#f5d218" },
  { idade: "14", cor: "#f0850c" },
  { idade: "16", cor: "#d40011" },
  { idade: "18", cor: "#161616" },
];

const swiperOptions: SwiperOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  freeMode: true,
  pagination: {
    clickable: true,
  },
  scrollbar: { hide: true },
  modules: [FreeMode, Scrollbar],
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
};
function setDefinirCorClassificacaoIndicativa(idade: string) {
  const classificacao = classificacoesIndicativas.find(
    (classificacao) => classificacao.idade === idade
  );
  return classificacao ? classificacao.cor : "";
}

function converterParaHorasEMinutos(totalMinutos: number) {
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return `${horas}h${minutos}min`;
}

const Filme = (data: IFilmeProps) => {
  const statusTextData = useFilmeTextStatus();
  const { formatMesmaSemana, formatPassouUmaSemanaDesdeData } =
    useFormatarData();
  const { formatarData } = useFormatarData();
  const { dataLayerFichafilme, dataLayerPlayTrailer, dataLayerMovieStream } =
    useGtag();

  const router = useRouter();
  const filme = data.movie?.movie;
  const isStreaming = filme.status == EStatus.STREAMING;
  const emExibicao =
    formatMesmaSemana(filme?.releasedate) ||
    formatPassouUmaSemanaDesdeData(filme?.releasedate) ||
    filme?.hasSession;

  const { isMobile, isLoading } = useIsMobile();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [iframe, setIframe] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [saibaMais, setSaibaMais] = useState<boolean>(filme.hasSession);

  useEffect(() => {
    dataLayerFichafilme(
      filme?.title,
      filme?.slug,
      filme?.originalTitle,
      filme?.genre,
      Number(filme?.idVibezzMovie)
    );
  }, []);

  const viewSaibaMais = useCallback(() => {
    setSaibaMais((prev) => !prev);
  }, []);

  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? filme.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === filme.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  function handleVerImagem(index: number) {
    setOpen(true);
    setImageIndex(index);
  }

  function handleVerVideo(data: string) {
    setOpenModal(true);
    setIframe(data);
  }

  if (isLoading) return <Loading altura={true} />;

  return (
    <>
      <section
        className={Style.areaBanner}
        style={{
          backgroundImage: `url(${
            isMobile ? filme?.bannerMobile : filme?.bannerDesktop
          })`,
        }}
      >
        <div className={Style.bannerFilme}>
          <div className="container">
            <div className={Style.areaTituloBanner}>
              <h1 style={{ color: filme.slug }}>{filme?.title}</h1>
              <div className={Style.subTitle}>
                <h2 className={Style.emExibicao}>
                  {!filme.hasSession ? (
                    <span className={Style.data}>
                      Estreia: {formatarData(filme?.releasedate ?? "")}
                    </span>
                  ) : (
                    <span className={Style.data}>{statusTextData(filme)}</span>
                  )}
                </h2>
                <div className={Style.areaBtnCompra}>
                  {!isStreaming && emExibicao && !isMobile && (
                    <button
                      onClick={() => {
                        router.push("#sessao", {
                          scroll: true,
                        });
                      }}
                    >
                      COMPRAR INGRESSOS
                    </button>
                  )}
                  {filme.streaming.length > 0 && !isMobile && (
                    <button
                      onClick={() => {
                        dataLayerMovieStream(
                          filme.title,
                          filme.slug,
                          filme.originalTitle,
                          filme.genre,
                          filme.streaming.toString(),
                          Number(filme.idVibezzMovie)
                        );
                        window.location.href = " https://www.primevideo.com/";
                      }}
                    >
                      ASSISTA AGORA NO
                      <LazyLoadImage
                        src={`/img/streaming/${"amazonprime"}.png`}
                        // alt={service.toLowerCase()}
                        width="100"
                        effect="blur"
                      />
                    </button>
                  )}
                  {filme.slug === "juntos" && (
                    <a
                      href="#regulamento"
                      onClick={(e) => {
                        e.preventDefault();
                        setSaibaMais(false);
                        setTimeout(() => {
                          const el = document.getElementById("regulamento");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                    >
                      PROMOÇÃO #JUNTOSNOCINEMA
                    </a>
                  )}
                </div>
              </div>
              <div className={Style.AreaSaibamais}>
                {filme.hasSession && (
                  <button
                    className={Style.btnSaibaMais}
                    onClick={viewSaibaMais}
                  >
                    Saiba +
                  </button>
                )}
              </div>
            </div>
            {/* {!isMobile && <Links youtube={filme?.trailer} insta="" />} */}
          </div>
        </div>
      </section>

      <div style={{ overflow: "hidden" }}>
        <div className="container">
          {!filme.hasSession && (
            <div className={Style.areaNewsletter}>
              <Newsletter
                isHorrizontal={!isMobile}
                isBg={true}
                filmes={filme}
                type="filme"
              />
            </div>
          )}
          {emExibicao && isMobile && !isStreaming && (
            <div className={Style.areaBtnCompra}>
              <button onClick={() => router.push("#sessao", { scroll: true })}>
                COMPRAR INGRESSOS
              </button>
            </div>
          )}
          {filme.streaming.length > 0 && isMobile && (
            <button
              onClick={() => {
                dataLayerMovieStream(
                  filme.title,
                  filme.slug,
                  filme.originalTitle,
                  filme.genre,
                  filme.streaming.toString(),
                  Number(filme.idVibezzMovie)
                );
              }}
            >
              ASSISTA AGORA NO
              <LazyLoadImage
                src={`/img/streaming/${"amazonprime"}.png`}
                // alt={service.toLowerCase()}
                width="100"
                effect="blur"
              />
            </button>
          )}

          {!saibaMais && (
            <section className={Style.filmeSaibaMais}>
              <div className={Style.areaPoster}>
                <div className={Style.areaFlexPoster} id="saibamais">
                  <LazyLoadImage
                    src={filme?.cover}
                    alt={filme?.title}
                    width={270}
                    height={400}
                  />
                  <div>
                    <h2>Sinopse</h2>
                    <p>{filme?.shortSynopsis}</p>
                    <div className={Style.AreaLinksSociais}>
                      <span
                        className={Style.areaAssitirTrailer}
                        onClick={() => handleVerVideo(filme.trailer)}
                      >
                        <FaYoutube />
                        <span>ASSISTA AO TRAILER</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={Style.areaFlexInformacoes}>
                  <div>
                    <h2>Informações</h2>
                    <div className={Style.areaClassificaçãoIndicativa}>
                      {filme?.age && (
                        <span
                          style={{
                            background: `${setDefinirCorClassificacaoIndicativa(
                              filme?.age
                            )}`,
                          }}
                        >
                          {filme?.age}
                        </span>
                      )}

                      <p>{filme?.ageExplain}</p>
                    </div>
                    <ul className={Style.areainformacaoFilme}>
                      <li>
                        <strong>Título Internacional:</strong>
                        {filme?.originalTitle}
                      </li>
                      <li>
                        <strong>Duração:</strong>
                        {converterParaHorasEMinutos(filme?.duration)}
                      </li>
                      <li>
                        <strong>Gênero:</strong>
                        {filme?.genre}
                      </li>
                      <li>
                        <strong>Elenco:</strong>
                        {filme?.cast}
                      </li>
                      <li>
                        <strong>Direção:</strong>
                        {filme?.director}
                      </li>
                      <li>
                        <strong>Data de Estreia:</strong>
                        {formatarData(filme?.releasedate)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {filme.slug === "juntos" && (
                <div id="regulamento" className={Style.regulamento}>
                  <section className={Style.areaRegulamento}>
                    <div>
                      <img src="./img/banner-site_700x900_UM-ANO.jpg" alt="" />
                    </div>
                    <div>
                      <h3>
                        REGRAS DA PROMOÇÃO #JUNTOSNOCINEMA PARA CONCORRER A UM
                        ANO DE CINEMAS GRÁTIS{" "}
                      </h3>
                      <p>
                        <strong>
                          Para concorrer a UM ANO DE CINEMA GRÁTIS você precisa:
                        </strong>
                      </p>

                      <ul>
                        <li>
                          Seguir o perfil da <strong>Diamond Films</strong> no
                          Instagram.
                        </li>
                        <li>
                          Gravar um vídeo ou foto conectado(a) a outra pessoa de
                          forma criativa e inusitada e postar entre os dias{" "}
                          <strong>14 e 20 de agosto</strong>.
                        </li>
                        <li>
                          Postar no seu feed do Instagram e marcar a{" "}
                          <strong>@diamondfilmsBR</strong> na publicação.
                        </li>
                        <li>
                          Incluir a hashtag <strong>#JuntosNoCinema</strong> na
                          legenda do post.
                        </li>
                        <li>
                          Deixar o seu perfil público no Instagram para validar
                          a participação.
                        </li>
                      </ul>

                      <p>
                        <em>* Confira o regulamento completo no botão.</em>
                      </p>
                      <p>
                        <em>
                          * Promoção válida durante a semana de estreia do
                          filme, de 14 a 20 de agosto de 2025.
                        </em>
                      </p>
                      <p>
                        <em>
                          * O anúncio da dupla vencedora será realizado no dia
                          29 de agosto de 2025.
                        </em>
                      </p>
                      <p>
                        <em>* Promoção Autorizada SPA/MF.</em>
                      </p>

                      <p>
                        Use e abuse da criatividade, mas lembre-se:{" "}
                        <strong>é só uma brincadeira!</strong> Não vale colocar
                        sua segurança ou a de outras pessoas em risco.
                      </p>
                      <div className={Style.linkRegulamento}>
                        <a
                          href="./pdf/Regulamento_0202505530.pdf"
                          target="_blank"
                        >
                          Leia o regulamento completo
                        </a>
                      </div>
                    </div>
                  </section>

                  <section className={Style.areaRegulamento}>
                    <div>
                      <img src="./img/banner-site_700x900_2x1.jpg" alt="" />
                    </div>
                    <section>
                      <h3>“JUNTOS NO CINEMA” - COMO GARANTIR INGRESSOS 2X1</h3>

                      <p>
                        <strong>
                          Durante a semana de estreia do filme <em>Juntos</em>,
                          de 14 a 20 de agosto de 2025
                        </strong>
                        , vá ao cinema* “grudado” com sua dupla e leve 2
                        ingressos pelo preço de 1!
                      </p>

                      <p>
                        Para participar, basta ir a um dos cinemas participantes
                        conectado a outra pessoa de qualquer forma criativa e
                        ganhar o benefício.
                      </p>

                      <p>
                        Confira os dias válidos da promoção em seu cinema
                        favorito.
                      </p>

                      <p>
                        <em>*Lista de exibidores participantes: </em>{" "}
                        Centerplex, Cine + Arte Capão da Canoa, Cine Araújo,
                        Cine Mais Arte, Cine Multiplex Villa Multimall, Cine Sul
                        Medianeira, Cine X, CineA, CineMais, Cineart, Cineflix,
                        Cinema C.Vale, Cinema Cine Flexx - Telêmaco Borba,
                        Cinemark, Cinépolis, Cinesystem, Circuito Cinemas,
                        Estação Net Cinema, GNC, Kinoplex, Mobi Cinemas,
                        Moviemax, Moviecom, Multicine, PMCCinelaser e UCI
                      </p>

                      <p>
                        A ação é válida para as salas de cinema em que o filme
                        estiver em cartaz, desde que obedeça às regras do
                        cinema.
                      </p>

                      <p>
                        Use e abuse da criatividade, mas lembre-se: é só uma
                        brincadeira!{" "}
                        <strong>
                          Não vale colocar sua segurança ou a de outras pessoas
                          em risco.
                        </strong>
                      </p>

                      <p>
                        <em>
                          * Promoção válida durante a semana de estreia do
                          filme, de 14 a 20 de agosto de 2025.
                        </em>{" "}
                        Confira os dias válidos da promoção em seu cinema
                        favorito.
                      </p>

                      <p>
                        <em>
                          * Válido somente para o filme <strong>JUNTOS</strong>.
                        </em>
                      </p>

                      <p>
                        <em>
                          * Os termos e condições podem variar entre os cinemas
                          participantes. Consulte os termos e condições
                          diretamente na rede exibidora.
                        </em>
                      </p>
                    </section>
                  </section>
                </div>
              )}
              <Slide.Title className={Style.slideTitle}>Vídeos</Slide.Title>
              <section className={Style.areaIframeVideoYoutube}>
                <section className={Style.gridIframeVideoYoutube}>
                  {filme?.videos?.map((data) => (
                    <div
                      className={Style.iframeVideoYoutube}
                      key={data.url}
                      onClick={() => {
                        dataLayerPlayTrailer(
                          filme.title,
                          filme.slug,
                          filme.originalTitle,
                          filme.genre,
                          "HUB",
                          Number(filme.idVibezzMovie)
                        );
                      }}
                    >
                      <iframe
                        className={Style.embedResponsiveItem}
                        src={`${data.url}?enablejsapi=1&origin=diamondfilms.com.br`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </section>
              </section>

              <Slide.Title className={Style.slideTitle}>Galeria</Slide.Title>
              <Slide.Content
                swiperOptions={swiperOptions}
                className={Style.areaSlide}
              >
                {filme?.images?.map((data, i) => (
                  <div key={data.url}>
                    <LazyLoadImage
                      effect="blur"
                      alt="Filme"
                      className={Style.SlideImgFilme}
                      src={`${data.url}`}
                      onClick={() => handleVerImagem(i)}
                      style={{ cursor: "pointer" }}
                      width={300}
                      height={200}
                    />
                  </div>
                ))}
              </Slide.Content>
            </section>
          )}
          {filme.hasSession && (
            <section id="sessao" className={Style.combrarIngresso}>
              <h2 className={Style.slideTitle}>Comprar ingressos</h2>
              <p>
                Para buscar as sessões: Selecione o ESTADO e a CIDADE, e veja os
                cinemas disponiveis com as sessões
              </p>
              <Sessoes filme={filme} color={filme.color} poster={filme.cover} />
            </section>
          )}

          <div className={Style.areaNewsletter}>
            <Newsletter
              isHorrizontal={!isMobile}
              isBg={true}
              filmes={filme}
              type="filme"
            />
          </div>

          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.modalImageFilme}
              >
                <LazyLoadImage
                  effect="blur"
                  src={filme.images[imageIndex]?.url}
                  className={Style.modalSlideImg}
                  alt="Imagem filmes"
                  width={700}
                  height={500}
                />
                <div className={Style.btnSlideImagem}>
                  <button onClick={handlePrevImage}>
                    <FiChevronLeft />
                  </button>
                  <button onClick={handleNextImage}>
                    <FiChevronRight />
                  </button>
                </div>
              </Model.Body>
            </Model.Root>
          )}
          {openModal && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpenModal(!openModal)}
                className={Style.ModaliframeVideoYoutube}
              >
                <div className={Style.iframeVideoYoutube} key={iframe}>
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={iframe}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Model.Body>
            </Model.Root>
          )}
        </div>
      </div>
    </>
  );
};

export default Filme;
