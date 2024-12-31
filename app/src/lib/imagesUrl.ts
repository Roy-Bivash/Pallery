import { config } from "@/config/config";

function formatImagesUrl(raw_url: string) {
    try {
      const url = new URL(raw_url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return raw_url;
      }
    } catch {}
    
    return config.SERVER_URL + raw_url;
}

export {
    formatImagesUrl
}