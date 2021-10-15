import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {object} from 'prop-types';
import {CENTER, CITIES, DEFAULT_ZOOM} from '../../constants';


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
