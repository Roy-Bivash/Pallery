function isURL(raw_url) {
    try {
      const url = new URL(raw_url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return true;
      }
    } catch {}
    
    return false;
}

export {
    isURL
}