import { default as rp } from "request-promise";

require("dotenv").config();

const API_KEY = process.env.SERVER_KEY;

export default {
  current: async () => {
    // get current location by device
    const deviceUri = {
      uri: "https://ipinfo.io",
      method: "GET",
      json: true
    };
    const deviceInfo = await rp(deviceUri);

    // get location info
    const nowUri = {
      uri: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        deviceInfo.loc
      }&sensor=${true}&key=${API_KEY}`,
      method: "GET",
      json: true
    };
    const now = await rp(nowUri);
    const city =
      now.results &&
      now.results[0] &&
      now.results[0].address_components &&
      `${now.results[0].address_components[1].short_name}, ${
        now.results[0].address_components[5].short_name
      }`;
    return (city && `near ${city}`) || "";
  },

  near: async (type: string) => {
    // get current location by device
    const deviceUri = {
      uri: "https://ipinfo.io",
      method: "GET",
      json: true
    };
    const deviceInfo = await rp(deviceUri);

    // get nearest location
    const placeUri = {
      uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        deviceInfo.loc
      }&radius=500&type=${type}&key=${API_KEY}`,
      method: "GET",
      json: true
    };
    const place = await rp(placeUri);

    // regex to remove
    let regexToReplace: RegExp;
    switch (type) {
      case "mosque":
        regexToReplace = /masjid/i;
        break;
      case "restaurant":
        break;
      default:
        break;
    }

    // limit the result to be just three
    return place.results.slice(0, 3).map((result: any) => {
      return {
        text: result.name.replace(regexToReplace, ""),
        callback_data: `${result.name}`
      };
    });
  }
};
