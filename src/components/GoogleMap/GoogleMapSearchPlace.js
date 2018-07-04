import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Esto está disponible al tener linkeado el javascript de GoogleMaps en el index.html
const google = window.google;

class GoogleMapSearchPlace extends Component {
  autocomplete = null;

  componentDidMount() {
    const { onSelectPlace } = this.props

    // Inicializo el input buscador de lugares
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'));

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry) {
        //Ejecuto el callback pasado por parámetro
        onSelectPlace({
          name: place.name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address
        })
      }
    });
  }

  render() {
    return <div className="form-group">
      <label htmlFor="exampleInputEmail1">Lugar</label>
      <input id="pac-input" type="text" placeholder="Ingrese una Dirección o un lugar" className="form-control"/>
      <small id="emailHelp" className="form-text text-muted">Se pueden buscar direcciones exactas o lugares.</small>
    </div>

  }
}

GoogleMapSearchPlace.propTypes = {
  onSelectPlace: PropTypes.func.isRequired,
};

export default GoogleMapSearchPlace
