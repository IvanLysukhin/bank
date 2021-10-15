import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {object} from 'prop-types';

export const CENTER = [54.7430600, 55.9677900];
export const DEFAULT_ZOOM = 5;

const MOSCOW = [55.7522200, 37.6155600];
const SARATOV = [51.5405600, 46.0086100];
const KAZAN = [55.7887400, 49.1221400];
const TUMEN = [57.1522200,  65.5272200];
const OMSK = [54.9924400, 73.3685900];

const CITIES = [MOSCOW, SARATOV, KAZAN, TUMEN, OMSK];

function MapComponent({link}) {
  return (
    <section className="map" ref={link}>
      <h2 className="map__title">Отделения Лига Банка</h2>
      <div className="map__box">
        <YMaps>
          <Map className="map__map" defaultState={{center: CENTER, zoom: DEFAULT_ZOOM}}>
            {CITIES.map((coordinate) =>
              (
                <Placemark
                  key={coordinate[0]}
                  geometry={coordinate}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'img/location.svg',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-3, -42],
                  }}
                />
              ))}
          </Map>
        </YMaps>
      </div>
    </section>
  );
}

MapComponent.propTypes = {link: object.isRequired};

export default MapComponent;
