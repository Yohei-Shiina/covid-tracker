import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { showDataOnMap } from './util'
import './Map.css'
import 'leaflet/dist/leaflet.css';

function Map({ countries, casesType, center, zoom }) {
  const [showMap, setShowMap] = useState(true)
  const [showCircle, setShowCircle] = useState(true)
  // Remove MapContainer when center/zoom changes
  useEffect(() => { setShowMap(false) }, [center, zoom])
  // then render MapCotnainer with new values(center/zoom)
  useEffect(() => { setShowMap(true) }, [showMap])

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
