import { useState } from 'react'
import styled from 'styled-components'
import { useEvents } from '../../../../context/EventContext'

const EventImagesContainer = styled.div`
  display: -moz-flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -moz-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  margin: -2.5em 0 0 -2.5em;

  article {
    -moz-transition:
      -moz-transform 0.5s ease,
      opacity 0.5s ease;
    -webkit-transition:
      -webkit-transform 0.5s ease,
      opacity 0.5s ease;
    -ms-transition:
      -ms-transform 0.5s ease,
      opacity 0.5s ease;
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
    position: relative;
    width: calc(33.33333% - 2.5em);
    margin: 2.5em 0 0 2.5em;

    .image {
      -moz-transition: -moz-transform 0.5s ease;
      -webkit-transition: -webkit-transform 0.5s ease;
      -ms-transition: -ms-transform 0.5s ease;
      transition: transform 0.5s ease;
      position: relative;
      display: block;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
      }

      &:before {
        pointer-events: none;
        -moz-transition:
          background-color 0.5s ease,
          opacity 0.5s ease;
        -webkit-transition:
          background-color 0.5s ease,
          opacity 0.5s ease;
        -ms-transition:
          background-color 0.5s ease,
          opacity 0.5s ease;
        transition:
          background-color 0.5s ease,
          opacity 0.5s ease;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        z-index: 1;
        opacity: 0.8;
      }

      &:after {
        pointer-events: none;
        -moz-transition: opacity 0.5s ease;
        -webkit-transition: opacity 0.5s ease;
        -ms-transition: opacity 0.5s ease;
        transition: opacity 0.5s ease;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cstyle%3Eline %7B stroke-width: 0.25px%3B stroke: %23ffffff%3B %7D%3C/style%3E%3Cline x1='0' y1='0' x2='100' y2='100' /%3E%3Cline x1='100' y1='0' x2='0' y2='100' /%3E%3C/svg%3E");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: 0.25;
        z-index: 2;
      }
    }

    a {
      display: -moz-flex;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -moz-flex-direction: column;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -moz-align-items: center;
      -webkit-align-items: center;
      -ms-align-items: center;
      align-items: center;
      -moz-justify-content: center;
      -webkit-justify-content: center;
      -ms-justify-content: center;
      justify-content: center;
      -moz-transition:
        background-color 0.5s ease,
        -moz-transform 0.5s ease;
      -webkit-transition:
        background-color 0.5s ease,
        -webkit-transform 0.5s ease;
      -ms-transition:
        background-color 0.5s ease,
        -ms-transform 0.5s ease;
      transition:
        background-color 0.5s ease,
        transform 0.5s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 1em;
      border-radius: 4px;
      border-bottom: 0;
      color: #ffffff;
      text-align: center;
      text-decoration: none;
      z-index: 3;

      &:last-child {
        margin: 0;
      }

      &:hover {
        color: #ffffff !important;
      }

      h2 {
        margin: 0;
      }

      .content {
        -moz-transition:
          max-height 0.5s ease,
          opacity 0.5s ease;
        -webkit-transition:
          max-height 0.5s ease,
          opacity 0.5s ease;
        -ms-transition:
          max-height 0.5s ease,
          opacity 0.5s ease;
        transition:
          max-height 0.5s ease,
          opacity 0.5s ease;
        width: 100%;
        max-height: 0;
        line-height: 1.5;
        margin-top: 0.35em;
        opacity: 0;

        & > :last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  article.style1 > .image:before {
    background-color: #000;
  }

  article.style2 > .image:before {
    background-color: #7ecaf6;
  }

  article.style3 > .image:before {
    background-color: #7bd0c1;
  }

  article.style4 > .image:before {
    background-color: #c75b9b;
  }

  article.style5 > .image:before {
    background-color: #ae85ca;
  }

  article.style6 > .image:before {
    background-color: #8499e7;
  }

  article .content {
    max-height: 15em;
    opacity: 1;
  }

  article:hover > .image {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }

  article:hover > .image:before {
    background-color: #333333;
    opacity: 0.35;
  }

  article:hover > .image:after {
    opacity: 0;
  }

  article:hover .content {
    max-height: 15em;
    opacity: 1;
  }

  @media screen and (max-width: 1280px) {
    margin: -1.25em 0 0 -1.25em;

    article {
      width: calc(33.33333% - 1.25em);
      margin: 1.25em 0 0 1.25em;
    }
  }

  @media screen and (max-width: 980px) {
    margin: -2.5em 0 0 -2.5em;

    article {
      width: calc(50% - 2.5em);
      margin: 2.5em 0 0 2.5em;
    }
  }

  @media screen and (max-width: 736px) {
    margin: -1.25em 0 0 -1.25em;

    article {
      width: calc(50% - 1.25em);
      margin: 1.25em 0 0 1.25em;
    }

    article:hover > .image {
      -moz-transform: scale(1);
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }
  }

  @media screen and (max-width: 480px) {
    margin: 0;

    article {
      width: 100%;
      margin: 1.25em 0 0 0;
    }
  }
`

export const EventList = () => {
  const { events } = useEvents()
  const [className, setClassName] = useState<string>('is-preload')

  const getClassName = () => {
    if (className === '') {
      setClassName('is-touch')
    } else {
      setClassName('')
    }
  }

  return (
    <>
      <h2>Ultimas Temporadas</h2>
      <EventImagesContainer
        onMouseEnter={() => getClassName()}
        onMouseLeave={() => getClassName()}
        className={className}
      >
        {events.map((event: any) => (
          <article key={event.id} className="style1">
            <span className="image">
              <img
                width={323}
                height={298}
                src={event.image}
                alt={event.name}
              />
            </span>
            <a href="generic.html">
              <h2>{event.name}</h2>
              <div className="content">
                <p>{event.description}</p>
              </div>
            </a>
          </article>
        ))}
      </EventImagesContainer>
    </>
  )
}
