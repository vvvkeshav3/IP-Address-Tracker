let ip = '192.212.174.101';
var mymap = L.map('mapid');
setMap(34.04915, -118.09462, ip);

let ipForm = document.querySelector('.ip-form');

function submitHandler(e) {
  e.preventDefault();
  ip = e.target[0].value;
  document.querySelector('.input-ip').value = '';
  findAddress(ip);
}

ipForm.addEventListener('submit', submitHandler);

// To set map
function setMap(lat, lng, ip) {
  mymap.setView([lat, lng], 13);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1Ijoia2VzaGF2LTAzOSIsImEiOiJja3A3OWFrMGEweWJ6MndxdGNxcXdjbDJzIn0.QPjxmSfFI0IRQMfWaV-1zA',
    }
  ).addTo(mymap);
  var marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup(` Ip Address<br><b> ${ip}</b><br>`).openPopup();
}

// set values that we get from api
function setValues(data) {
  const { ip, location, isp } = data;
  const { region, city, lat, lng, postalCode, timezone } = location;
  document.querySelector('.ip-address p').textContent = ip;
  document.querySelector(
    '.location p'
  ).textContent = `${region}, ${city} ${postalCode}`;
  document.querySelector('.timezone p').textContent = `UTC${timezone}`;
  document.querySelector('.isp p').textContent = `${isp}`;
  console.log(parseFloat(lat), parseFloat(lng));
  setMap(parseFloat(lat), parseFloat(lng), ip);
}

// api request
function findAddress(ipAddress) {
  axios
    .get(
      `https://geo.ipify.org/api/v1?apiKey=at_CzOIeBXXbpXVq5NZoHDo8REIVNTue&ipAddress=${ipAddress}`
    )
    .then((res) => {
      setValues(res.data);
    })
    .catch((err) => {
      console.log(err);
      alert('wrong IP Address');
    });
}
