const axios = require('axios');

const url = 'https://api.monerium.dev/auth/token';

const clientId = '4ef7adfa-20be-11ee-ad2d-92520e0bb667';
const clientSecret = '5037b5cba40761bc500d3317f6eb6fb8c6bcae50b5aa56f3b3359932148b1ae0';

const requestData = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
};

axios.post(url, null, { params: requestData })
    .then((response) => {
        console.log('access_token:', response.data.access_token);
        // Handle the response data here
    })
    .catch((error) => {
        console.error('Error:', error.message);
        // Handle errors here
    });
