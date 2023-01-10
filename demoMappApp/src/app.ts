import axios from "axios";

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyDM8QmdzwTVGwWooBzdPrIkDW1Zgma6xD4';

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: 'OK' | 'ZERO_RESULTS';
};

const searchAddressHandler = (e: Event): any => {
    e.preventDefault();
    const enteredAddress = addressInput.value;

    // send to Google APIs!
    axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}
        &key=${GOOGLE_API_KEY}`
    )
        .then((res) => {
            console.log('res', res);
            
            if (res.data.status !== 'OK') {
                throw new Error('Could not find location!');
            }
            const coordinates = res.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 8
            });
            
            new google.maps.Marker({
                position: coordinates,
                map: map,
            });
        })
        .catch((err: any) => {
            alert(err.message);
            console.log(err);
        })
}

form.addEventListener('submit', searchAddressHandler)