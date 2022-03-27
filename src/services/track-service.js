require("dotenv").config();
const axios = require("axios").default;

const hostsInfo = {
  rumble: {
    embedRegex: /https:\/\/rumble.com\/embed\/[a-z0-9]*/,
    thumbnailRegex: /thumbnailUrl":"(.*\.jpg)"/,
  },
  bitchute: {
    thumbnailRegex:
      /https:\/\/.*.bitchute.com\/live\/cover_images\/[a-zA-Z]*\/.*.jpg/,
  },
  odysee: {
    thumbnailRegex:
      /"thumbnailUrl": "(https:\/\/cards.odysee.com\/[a-zA-Z0-9]*.jpg)"/,
    embedRegex:
      /"embedUrl": "(https:\/\/odysee.com\/\$\/embed\/[a-zA-Z0-9-]*\/[a-z0-9]*\?)"/,
  },
  brandnewtube: {
    thumbnailRegex:
      /name="thumbnail" content="(https:\/\/.*\/upload\/photos\/2021\/12\/.*.jpe?g)"/,
    embedRegex: /src="(https:\/\/brandnewtube.com\/embed\/[a-zA-Z0-9]*)"/,
  },
};

export default class TrackService {
  async getTrackDetails(host, shareUrl) {
    return axios.get(shareUrl).then(function (response) {
      let embedRegex;
      let thumbnailRegex;
      switch (host) {
        case "rumble":
          embedRegex = hostsInfo.rumble.embedRegex;
          thumbnailRegex = hostsInfo.rumble.thumbnailRegex;
          return {
            embedUrl: executeRegex(embedRegex, response.data)[0],
            thumbnailUrl: executeRegex(thumbnailRegex, response.data)[1],
          };
        case "bitchute":
          thumbnailRegex = hostsInfo.bitchute.thumbnailRegex;
          return {
            embedUrl: shareUrl.replace("video", "embed"),
            thumbnailUrl: executeRegex(thumbnailRegex, response.data)[0],
          };
        case "odysee":
          embedRegex = hostsInfo.odysee.embedRegex;
          thumbnailRegex = hostsInfo.odysee.thumbnailRegex;
          return {
            embedUrl: executeRegex(embedRegex, response.data)[1],
            thumbnailUrl: executeRegex(thumbnailRegex, response.data)[1],
          };
        case "brandnewtube":
          embedRegex = hostsInfo.brandnewtube.embedRegex;
          thumbnailRegex = hostsInfo.brandnewtube.thumbnailRegex;
          // TODO find out why thumbnail cannot always be fetched
          const thumbnailRegexMatch = executeRegex(
            thumbnailRegex,
            response.data
          );
          return {
            embedUrl: executeRegex(embedRegex, response.data)[1],
            thumbnailUrl: Array.isArray(thumbnailRegexMatch)
              ? thumbnailRegexMatch[1]
              : null,
          };
      }

      return { embedUrl: null, thumbnailUrl: null };
    });
  }
}

function executeRegex(regex, data) {
  return regex.exec(data);
}
