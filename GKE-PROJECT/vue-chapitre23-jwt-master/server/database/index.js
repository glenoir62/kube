const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jean:123@cluster0.urpjt.gcp.mongodb.net/vue3c23?retryWrites=true&w=majority').then(() => {
    console.log('Connected !')
}).catch(e => console.log(e));