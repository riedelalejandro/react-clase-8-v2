import React from 'react'
import { Redirect } from 'react-router-dom'
import GoogleMap  from '../GoogleMap'

const PlacePage = ({ match, places, onRemovePlace }) => {
  const place = places.find(place => place.name === match.params.name);

  return place ? (
    <div>
      <h1>{place.name}</h1>
      <h4>{place.address} <button onClick={() => {onRemovePlace(place)}} className="btn btn-outline-secondary">Quitar de la lista</button></h4>
      <GoogleMap lat={place.lat} lng={place.lng} />
    </div>
  ) : <Redirect to="/places" />
};

export default PlacePage