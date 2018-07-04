import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HomePage = ({places, onSelectPlace, onRemovePlace}) => (
  <div>
    <h1>Mis Lugares</h1>
    {!places.length ? (
      <div className="alert alert-warning" role="alert">
        No hay lugares cargados
      </div>
      ) :
      (
        <ul className="list-group">
          {places.map(place => (
            <li key={place.name} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/places/${place.name}`}>{place.name}</Link> <button onClick={() => {onRemovePlace(place)}} className="btn btn-outline-secondary">Quitar de la lista</button>
            </li>
          ))}
        </ul>
      )}
  </div>
);

HomePage.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  })).isRequired,
};

export default HomePage