export const fetchBookings = (fileName) => fetch(`http://localhost:8888/${fileName}`)
    .then((response) => response.json());
