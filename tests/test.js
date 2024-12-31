const axios = require('axios');

// Test service1
for (let i = 0; i < 100; i++) {
    axios.get('http://localhost:3000/service1')
        .then(function (response) {
            console.log('service1, -',response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

// Test service2
for (let i = 0; i < 100; i++) {
    axios.get('http://localhost:3000/service2')
        .then(function (response) {
            console.log('service2, -',response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

// // Test matrix
// axios.get('http://localhost:3000/metrics')
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
