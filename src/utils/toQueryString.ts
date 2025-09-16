

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


export {
  toQueryString,
}