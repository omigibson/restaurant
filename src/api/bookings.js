const base_url = 'http://localhost:8888';

export const fetchBookings = (fileName) => fetch(`${base_url}/${fileName}`)
    .then((response) => response.json());

export const sendToAPI = (json, fileName) => {
  console.log('SendToAPI json', json);
  console.log('SendToAPI fileName', fileName);
  return fetch(`${base_url}/${fileName}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(json)
  }).then((response) => response.json())
}
