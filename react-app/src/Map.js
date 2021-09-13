import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';

function Map({ center, zoom }) {
  const [showMap, setShowMap] = useState(true)
  // Remove MapContainer when center/zoom changes
  useEffect(() => { setShowMap(false) }, [center, zoom])
  // then render MapCotnainer with new values(center/zoom)
  useEffect(() => { setShowMap(true) }, [showMap])

  return (
    <div className="map">
      {showMap && (
        <MapContainer center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </div>
  )
}

export default Map
