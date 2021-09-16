import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { showDataOnMap } from './util'
import './Map.css'
import 'leaflet/dist/leaflet.css';

function Map({ countries, casesType, center, zoom }) {
  const [showMap, setShowMap] = useState(false)
  const [showCircle, setShowCircle] = useState(false)

  // Todo: replace these code using these
  // https://react-leaflet.js.org/docs/api-map/ and https://leafletjs.com/reference-1.7.1.html#map-setview
  // https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
  // Remove MapContainer when center/zoom changes
  useEffect(() => { setShowMap(false) }, [center, zoom])
  // then render MapCotnainer with new values(center/zoom)
  useEffect(() => { setShowMap(true) }, [showMap])

  // Todo: replace these code using:
  // https://react-leaflet.js.org/docs/api-components/
  // Remove MapContainer when casesType changes
  useEffect(() => { setShowCircle(false) }, [casesType])
  // then render MapCotnainer with new values(casesType)
  useEffect(() => { setShowCircle(true) }, [showCircle])

  return (
    <div className="map">
      {showMap && (
        <MapContainer center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showCircle && showDataOnMap(countries, casesType)}
        </MapContainer>
      )}
    </div>
  )
}

export default Map
