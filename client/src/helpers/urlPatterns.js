export const detectHostUrl = {
  bitchute: (url) =>
    /https?:\/\/(?:www)?\.?bitchute\.com\/video\/([a-zA-Z0-9]{1,64})\//g.test(
      url
    ),
  rumble: (url) => /https:\/\/rumble\.com\/.*.html/.test(url),
  odysee: (url) => /https:\/\/odysee.com\/@.*\/.*:[a-zA-Z0-9]/.test(url),
  brandNewTube: (url) =>
    /https:\/\/brandnewtube.com\/watch\/.*.html/.test(url) ||
    /https:\/\/brandnewtube.com\/v\/[a-zA-Z0-9]{6}/.test(url),
};

export const detectHostEmbedUrl = {
  facebook: (url) =>
    /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/.test(
      url
    ),
  bitchute: (url) =>
    /https?:\/\/(?:www)?\.?bitchute\.com\/embed\/([a-zA-Z0-9]{1,64})\//g.test(
      url
    ),
  rumble: (url) => /https:\/\/rumble.com\/embed\/[a-z0-9]*/.test(url),
  odysee: (url) =>
    /https:\/\/odysee.com\/\$\/embed\/[a-zA-Z0-9-]*\/[a-z0-9]*\?/.test(url),
  brandNewTube: (url) =>
    /https:\/\/brandnewtube.com\/embed\/[a-zA-Z0-9]*/.test(url),
};
