const base_url = 'http://localhost:8888';
export const fetchBookings = (fileName) => fetch(`${base_url}/${fileName}`)
    .then((response) => response.json());

export const sendToAPI = (json, fileName) => {
      return fetch(`http://localhost:8888/${fileName}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(json)
      })
        .then((response) => response.json())
    }
