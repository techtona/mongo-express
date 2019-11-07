let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let mhsSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    nim: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
mhsSchema.plugin(uniqueValidator);

let Mhs = module.exports = mongoose.model('mahasiswa', mhsSchema);
module.exports.get = function(callback, limit){
    Mhs.find(callback).limit(limit);
}