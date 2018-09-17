const base_url = 'http://localhost:8888/resturant';
export const fetchBookings = (fileName) => fetch(`${base_url}/${fileName}`)
    .then((response) => response.json());
