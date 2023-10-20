import { useState, useEffect } from "react";

import IconArrowRight from "./assets/icons/IconArrowRight.svg";
import IconLocation from "./assets/icons/IconLocation.svg";

// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

function App() {
  const customIcon = new Icon({
    iconUrl: IconLocation,
    iconSize: [46, 56],
  });

  const [IPAddress, setIPAddress] = useState("");
  const [iPAddressValue, setIPAddressValue] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [ISP, setISP] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 27.5035,
    lng: 77.67215,
  });

  const fetchLocation = (ipAddress = "101.33.9.255") => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_4Wy3TYXzXnkgINE6ZPt7iXVmTb8CF&ipAddress=${ipAddress}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIPAddress(data.ip);
        setLocation(
          `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
        );
        setTimezone(`UTC ${data.location.timezone}`);
        setISP(`${data.isp}`);
        setCoordinates({ lat: data.location.lat, lng: data.location.lng });
      });
  };

  const handleSearch = () => {
    setIPAddress(iPAddressValue);
    fetchLocation(iPAddressValue);
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  return (
    <div className="flex flex-col h-screen relative">
      <div className="h-2/5 min-w-full search-bar-container bg-cover flex flex-col gap-5 md:justify-center items-center sm:pt-0 pt-6 z-40">
        <span className="text-white md:font-bold font-medium items-center md:text-3xl text-2xl">
          IP Address Tracker
        </span>
        <div className="flex justify-center items-center md:h-14 h-12 min-w-full">
          <input
            type="text"
            name="search"
            id="search"
            className="rounded-l-lg h-full w-9/12 max-w-xl px-5"
            placeholder="Search for any IP address or domain"
            onChange={(e) => setIPAddressValue(e.target.value)}
          />
          <div
            className="rounded-r-lg h-full flex justify-center items-center bg-black w-14 cursor-pointer"
            onClick={() => handleSearch()}
          >
            <img src={IconArrowRight} alt="Icon Arrow Right" />
          </div>
        </div>
        <div className="w-11/12 rounded-lg absolute md:top-1/3 top-1/4 left-1/12  max-w-5xl  md:mt-0 -mt-7  bg-white z-10 flex flex-col justify-center items-center sm:flex-row container gap-4 p-4 sm:p-8">
          <div className="sm:border-r-2 w-full border-slate-300 flex flex-col md:items-start items-center md:pr-2">
            <p className="md:text-sm text-xs text-slate-400 font-semibold uppercase">
              IP Address
            </p>
            <p className="md:text-2xl text-xl text-black font-bold">
              {IPAddress}
            </p>
          </div>
          <div className="sm:border-r-2 w-full border-slate-300 flex flex-col  md:items-start items-center">
            <p className="md:text-sm text-xs text-slate-400 font-semibold uppercase">
              Location
            </p>
            <p className="md:text-2xl text-xl text-black font-bold">
              {location}
            </p>
          </div>
          <div className="sm:border-r-2 w-full border-slate-300 flex flex-col  md:items-start items-center">
            <p className="md:text-sm text-xs text-slate-400 font-semibold uppercase">
              Timezone
            </p>
            <p className="md:text-2xl text-xl text-black font-bold">
              {timezone}
            </p>
          </div>
          <div className="w-full flex flex-col  md:items-start items-center">
            <p className="md:text-sm text-xs text-slate-400 font-semibold uppercase">
              ISP
            </p>
            <p className="md:text-2xl text-xl text-black font-bold">{ISP}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-3/5 z-0">
        <MapContainer
          center={coordinates}
          zoom={13}
          key={`${coordinates.lat}${coordinates.lng}`}
        >
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
          <Marker position={coordinates} icon={customIcon}></Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
