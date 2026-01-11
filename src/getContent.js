const getContentType = (ext) => {
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css"
    case ".js":
      return "application/javascript"
    case ".jpeg", ".jpg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".pdf":
      return "application/pdf"
    case ".json":
      return "application/json"
    default:
        return "application/octet-stream"
  }
}

exports.getContentType = getContentType