import { LoadingIndicator } from 'components/LoadingIndicator';
import { useEffect, useState } from 'react';

import './MapView.css';

declare const ymaps: any;

interface MapViewProps {
  coordinates: [number, number];
}

const MapView = ({ coordinates }: MapViewProps) => {
  const init = () => {
    const myMap = new ymaps.Map(
      'mapview',
      {
        center: coordinates,
        zoom: 14,
      },
      {
        balloonMaxWidth: 200,
      },
    );

    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    //==============CREATE_BALLON==================
    const myGeoObject = new ymaps.GeoObject(
      {
        geometry: {
          type: 'Point',
        },
      },
      {
        preset: 'islands#redStretchyIcon',
        draggable: false,
      },
    );

    if (coordinates.length) {
      myGeoObject.geometry.setCoordinates(coordinates);
      myMap.geoObjects.add(myGeoObject);
    }
  };

  const [loading, setLoading] = useState(true);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const start = () => {
      if (!('ymaps' in window)) {
        setTimeout(() => setIsReload((prevState) => !prevState), 1500);
      } else {
        ymaps.ready(init);
        setLoading(false);
        setIsReload(false);
      }
    };
    start();
  }, [isReload]);

  return (
    <div className="mapContainer">
      {loading && <LoadingIndicator />}
      <div className="map" id="mapview"></div>
    </div>
  );
};

export default MapView;
