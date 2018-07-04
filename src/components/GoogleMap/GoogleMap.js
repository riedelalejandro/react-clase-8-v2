import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Esto está disponible al tener linkeado el javascript de GoogleMaps en el index.html
const google = window.google;

class GoogleMap extends Component {
  map = null;
  marker = null;

  componentDidMount() {
    const { lat, lng } = this.props;

    // Creamos una nueva instancia de GoogleMaps para renderear en el div que tiene el ID "map"
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
    });

    // Ponemos una marca en el mapa
    this.buildMarker();
  }

  buildMarker = () => {
    // Obtenemos la latitud y longitud de las props
    const { lat, lng } = this.props

    // Agregamos la marca al mapa
    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map
    });

    // Centramos el mapa en las coordenadas de la marca
    this.map.setCenter({ lat, lng });
  };

  componentDidUpdate() {
    // cada vez que nuestro componente se actualice por un cambio de props, actualizo la marca del mapa
    this.buildMarker();
  }

  render() {
    return <div id="map" style={{ height: '400px', width: '100%' }}/>
  }
}

GoogleMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default GoogleMap
