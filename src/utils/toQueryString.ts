

function toQueryString(obj: any) {
  return Object.entries(obj)
    .map(
      ([key, values]: any) =>
        `${encodeURIComponent(key)}=${values
          .map(encodeURIComponent)
          .join(",")}`
    )
    .join("&");
}


  // get search query from url and parse back to object
function parseQueryString(queryString: any) {
    const params = new URLSearchParams(queryString);
    const obj: any = {};

    for (const [key, value] of params.entries()) {
      obj[key] = value.split(",").map(decodeURIComponent);
    }
    return obj;
  }



export {
  toQueryString,
  parseQueryString,
}