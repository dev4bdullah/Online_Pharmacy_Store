import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: "/vite.svg",
  shadowUrl: "/vite.svg",
  iconSize: [5, 5],
  iconAnchor: [5, 5],
});
L.Marker.prototype.options.icon = DefaultIcon;

const SocialMedia = () => {
  const mapsUrl = "https://maps.app.goo.gl/oYKHXcHxRzZVRRYJ8?g_st=iwb";
  const position = [32.575723863248356, 74.08147303967336];

  return (
    <div>
      {/* Embedded OpenStreetMap */}
      <div className=" mb-4  h-44 w-64 rounded-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          <Marker position={position}>
            <Popup>Our Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Link to open Google Maps */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-white hover:text-black text-sm"
      >
        <FaMapMarkerAlt className="mr-2" />
        <span>Open in Google Maps</span>
      </a>
    </div>
  );
};

export default SocialMedia;
