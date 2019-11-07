Mhs = require('../models/mahasiswaModel');

exports.index = function(req, res){
    Mhs.get(function(err, mhs){
        if(err){
            res.json({
                status : 'error',
                message : err
            })
        }
        res.json({
            status : 'success',
            data : mhs
        })
    })
}

exports.store = function(req,res){
    var mhss = new Mhs();
    mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
    mhss.nama = req.body.nama;
    mhss.alamat = req.body.alamat;
    mhss.save(function(err){
        if(err)
            res.json(err)
        
        res.json({
            message : 'tambah data berhasil',
            data : mhss
        })
    })
}