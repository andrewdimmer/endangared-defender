import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import { MapPoint } from "../@Types/types";

export class MapContainer extends React.Component<{
  google: any;
  size: number;
  markerData: MapPoint[];
}> {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={1.5}
        initialCenter={{
          lat: this.props.markerData[0] ? this.props.markerData[0].lat : 0,
          lng: this.props.markerData[0] ? this.props.markerData[0].long : 0,
        }}
        containerStyle={{
          width: `${this.props.size}px`,
          height: `${this.props.size}px`,
        }}
      >
        {this.props.markerData.map((value, index) => (
          <Marker
            key={`map_marker_${index}`}
            title={`${value.count} sighted on ${value.date}`}
            position={{ lat: value.lat, lng: value.long }}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAUnw5TKGgunW7YWzZRuLSmTDbUq5QgSTM",
})(MapContainer);
