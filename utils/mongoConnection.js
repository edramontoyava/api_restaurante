const mongoose = require('mongoose');

mongoose.connect
(
    'mongodb+srv://edramontoyava:Fze7EU8At7BTVbob@cluster0.8c0uaup.mongodb.net/rest_base?retryWrites=true&w=majority'
)
.then(()=> console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Errror al conectar a MongoDB:', err));

module.exports = mongoose;