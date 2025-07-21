/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import Style from "./Sessoes.module.scss";
import * as S from "./styles";
import { Loading } from "@/components/atoms";
import { useLocationContext } from "@/components/molecules/Location/LocationContext";
import { useFormatarData } from "@/utils/hooks/useFormatarData/formatarData";
import { useGtag } from "@/utils/lib/gtag";
import { getLocation, getSession } from "@/utils/server/requests";
import {
  ESTADOS,
  IFilmeResponse,
  Sessions,
  Location,
  SessionsArrayResponse,
} from "@/utils/server/types";
import { darken } from "polished";
import { Model } from "@/components/molecules";

interface ISessoesProps {
  filme: IFilmeResponse;
  poster: string;
  color: string;
}

interface IModalData {
  theaterName: string;
  hour: string;
  links: { url: string; source: string }[];
  session: Sessions;
}

const Sessoes: React.FC<ISessoesProps> = ({ color, poster, filme }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<Sessions[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData | null>(null);
  const [localFilmes, setLocalFilmes] = useState<Location[]>();
  const [state, setState] = useState<string>();
  const [cities, setCities] = useState<string>();
  const [sessoes, setSessoes] = useState<SessionsArrayResponse>();
  const [loadings, setLoadings] = useState<boolean>(false);

  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData();
  const { dataLayerMovieTicket } = useGtag();
  const { location, loading, locationArea } = useLocationContext();

  const calculateDistance = (lat2: number, lon2: number) => {
    const lat1 = location.latitude;
    const lon1 = location.longitude;

    if (lat1 === 0 && lon1 === 0) {
      return 0;
    }

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  function obterNomeEstado(sigla: string): string {
    return ESTADOS[sigla] || "Estado não encontrado";
  }

  function handleDataClick(date: string): void {
    const selectedSession = sessoes?.sessions?.find(
      (session) => session?.date === date
    );
    const filteredSessions = selectedSession
      ? groupSessoes([selectedSession.sessions])
      : [];
    setFilteredSessions(filteredSessions);
    setSelectedDate(date);
  }

  function formatarHora(hora: string): string {
    return hora?.slice(0, 5);
  }

  function handleClickBanner(data: Sessions, link: string, source: string) {
    console.log(data);

    dataLayerMovieTicket(
      filme.title,
      filme.slug,
      filme.originalTitle,
      filme.genre,
      data.theaterName,
      data.address,
      data.hour,
      Number(filme.idVibezzMovie),
      link,
      data.exhibitor
    );
  }

  const groupSessoes = (sessao: Sessions[] | undefined) => {
    const groupedSessions: {
      [key: string]: Sessions & {
        hours: any[];
        distance: number;
        stateName: string;
      };
    } = {};

    if (!sessao) return [];

    sessao.forEach((sessionsArray) => {
      if (!sessionsArray) return;

      const arrayToIterate = Array.isArray(sessionsArray)
        ? sessionsArray
        : [sessionsArray];

      arrayToIterate.forEach(
        (
          {
            theaterName,
            hour: sessionHour,
            link: links,
            link_cinemark,
            link_ingresso,
            alternative_link,
            exhibitor,
            ...rest
          } = {} as Sessions
        ) => {
          // se theaterName não existir, pula
          if (!theaterName) return;

          const key = `${theaterName}`;
          const distance = calculateDistance(
            Number(rest.lat),
            Number(rest.lng)
          );
          const stateName = obterNomeEstado(rest.state);

          if (!groupedSessions[key]) {
            groupedSessions[key] = {
              theaterName,
              hour: sessionHour,
              hours: [],
              distance,
              stateName,
              link_cinemark,
              link_ingresso,
              alternative_link,
              exhibitor,
              ...rest,
            };
          }

          groupedSessions[key].hours.push({
            hour: sessionHour,
            links,
            exhibitor,
            link_cinemark,
            link_ingresso,
            alternative_link,
          });
        }
      );
    });

    return Object.values(groupedSessions).sort(
      (a, b) => a.distance - b.distance
    );
  };

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (sessoes) {
      const getDate = sessoes.sessions.find(
        (session) => session?.date === selectedDate
      );

      const sessionList = getDate?.sessions;

      if (Array.isArray(sessionList)) {
        setFilteredSessions(groupSessoes([sessionList]));
      } else {
        const fallback = sessoes.sessions[0]?.sessions;
        if (Array.isArray(fallback)) {
          setSelectedDate(sessoes.sessions[0].date);
          setFilteredSessions(groupSessoes([fallback]));
        } else {
          setFilteredSessions([]);
        }
      }
    }
  }, [selectedDate, location, sessoes]);

  useEffect(() => {
    const getFilmeLocation = async () => {
      setLoadings(true);
      const res = await getLocation(filme.slug);
      setLoadings(false);
      setLocalFilmes(res);
    };
    getFilmeLocation();
  }, [filme.slug]);

  useEffect(() => {
    const getFilmeSessoes = async () => {
      if (cities) {
        const res = await getSession(filme.slug, cities);
        setSessoes(res);
      }
    };
    getFilmeSessoes();
  }, [filme.slug, cities, location]);

  useEffect(() => {
    const getFilmeSessoes = async () => {
      try {
        const res = await getSession(filme.slug, locationArea?.address.city);
        setSessoes(res);
        setFilteredSessions([res]);
      } catch (e) {
        return;
      }
    };
    getFilmeSessoes();
  }, [locationArea, filme.slug]);

  const handleOpenModal = (
    session: Sessions & { hours?: any[] },
    hour: string,
    links: { url: string; source: string }[]
  ) => {
    setModalData({
      theaterName: session.theaterName,
      hour,
      links,
      session, // salvando a sessão completa
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };
  // Utility function to format time
  const formatTime = (hora: string) => hora?.slice(0, 5);

  const Horarios = (session: Sessions) => {

    if (!session.hours || !Array.isArray(session.hours)) return null;

    const hourMap = new Map<string, { url: string; source: string }>();

    session.hours.forEach(({ hour, links, link_cinemark }) => {
      const horaFormatada = formatarHora(hour);

      // Verifica se deve usar link_cinemark em vez de links
      const finalLink =
        link_cinemark && !links.includes("www.cinemark.com.br")
          ? link_cinemark
          : links;

      const source = finalLink.includes("cinemark")
        ? "Cinemark"
        : finalLink.includes("ingresso")
        ? "Ingresso.com"
        : "Veloxtickets";

      // Se o horário já existe no mapa, só substitui se for um link melhor (Cinemark)
      if (!hourMap.has(horaFormatada)) {
        hourMap.set(horaFormatada, { url: finalLink, source });
      } else {
        const currentLink = hourMap.get(horaFormatada)!;
        // Se o link atual NÃO é do Cinemark e o novo é, substitui
        if (
          !currentLink.url.includes("www.cinemark.com.br") &&
          finalLink.includes("www.cinemark.com.br")
        ) {
          hourMap.set(horaFormatada, { url: finalLink, source });
        }
      }
    });

    const horariosOrdenados = Array.from(hourMap.entries()).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    return (
      <ul className={Style.listaHorarios}>
        {horariosOrdenados.map(([hora, linkData], i) => (
          <li key={i}>
            <S.LinkHora
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              $color={color}
              // @ts-ignore: Unreachable code error
              onClick={() => handleClickBanner(session, linkData.url)}
            >
              {hora}
            </S.LinkHora>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <img
          className={Style.SessoesPoster}
          src={poster}
          alt="Poster Filme"
          width={1000}
          height={500}
        />
        <div
          className={Style.areaPesquisa}
          style={{ background: `${darken(0.2, color)}` }}
        >
          <div
            className={Style.HorarioSessoes}
            style={{ background: `${darken(0.2, color)}` }}
          >
            <div className={Style.flexAreaPesquisa}>
              <IoSearchSharp />
              <label htmlFor="estado">
                <select
                  id="estado"
                  value={state}
                  onChange={({ target }) => setState(target.value)}
                >
                  <option value="estado">Estado</option>
                  {localFilmes
                    ?.sort((a, b) => a.state.localeCompare(b.state))
                    ?.map((data) => (
                      <option key={data.state} value={data.state}>
                        {obterNomeEstado(data.state)}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="cidade">
                <select
                  id="cidade"
                  value={cities}
                  onChange={({ target }) => setCities(target.value)}
                >
                  <option value="cidade">Cidade</option>
                  {localFilmes &&
                    localFilmes
                      .find((item) => item.state === state)
                      ?.cities.slice()
                      .sort((a, b) => a.localeCompare(b))
                      .map((city: string) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
              </label>
            </div>
            {loadings && loading && <Loading />}
            {filteredSessions.length !== 0 && !loading && (
              <>
                <div
                  className={Style.flexData}
                  style={{ background: `${color}` }}
                >
                  {sessoes?.sessions.map((data, i) => (
                    <S.ButtonHora
                      key={i}
                      $bg={` ${
                        selectedDate === data.date ? darken(0.2, color) : "#fff"
                      }`}
                      className={`${Style.areaData}`}
                      onClick={() => handleDataClick(data.date)}
                    >
                      <span className={Style.mes}>{formatMes(data.date)}</span>
                      <span className={Style.dia}>{formatDia(data.date)}</span>
                      <span className={Style.diaSemana}>
                        {formatDiaDaSemana(data.date)}
                      </span>
                    </S.ButtonHora>
                  ))}
                </div>
                <div className={Style.areaSessao}>Escolha uma sessão:</div>
                <div className={Style.areaCinema}>
                  {filteredSessions.map((session, i) => (
                    <div key={i} className={Style.ItemSessao}>
                      <div className={Style.flexTitle}>
                        <img
                          src="/img/icon _ticket_.png"
                          alt={session.theaterName}
                          width={50}
                          height={50}
                        />
                        <div className={Style.areaTitle}>
                          {session.distance > 0 && (
                            <>
                              <span>{session.distance.toFixed(1)}</span>KM
                            </>
                          )}
                          <div className={Style.flexTitleName}>
                            <h3>{session.theaterName}</h3>
                            <S.LinkLocation
                              href={`https://maps.google.com/?q=${session.lat},${session.lng}`}
                              target="_blank"
                              rel="noreferrer"
                              $color={color}
                            >
                              <FaMapMarkedAlt />
                            </S.LinkLocation>
                          </div>
                          <h4>
                            {session.address}, {session.number}
                            {session.addressComplement && "-"}
                            {session.addressComplement}, {session.city} {" - "}
                            {session.state}
                          </h4>
                        </div>
                      </div>
                      <div className={Style.areaSalaHorario}>
                        <span>{session.technology}</span>
                        <div>
                          <h4>Horários disponíveis:</h4>
                          {Horarios(session)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showModal && modalData && (
        <Model.Root>
          <Model.Body setOpen={closeModal}>
            <Model.Title>Escolha onde comprar</Model.Title>
            <Model.Content>
              <section className={Style.modalSection}>
                <h3>{modalData.theaterName}</h3>
                <p>Horário: {modalData.hour}</p>
                <div className={Style.modalLinks}>
                  {modalData.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.modalLink}
                      onClick={() =>
                        handleClickBanner(
                          {
                            ...modalData.session,
                            theaterName: modalData.theaterName,
                            hour: modalData.hour,
                          },
                          link.url,
                          link.source
                        )
                      }
                    >
                      <img src={`/img/logos/${link.source}.png`} alt="" />
                    </a>
                  ))}
                </div>
              </section>
            </Model.Content>
          </Model.Body>
        </Model.Root>
      )}
    </section>
  );
};

export default React.memo(Sessoes);
