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

exports.update =  function(req,res){
    Mhs.findById(req.params.id, function(err, mhss){
        if(err)
            res.send(err);
        
        mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
        mhss.nama = req.body.nama;
        mhss.alamat = req.body.alamat;
        mhss.save(function(err){
            if(err)
                res.send(err)
            
            res.json({
                message : 'berhasil menambah data',
                data : mhss
            })
        })
    })
}

exports.updateByNim =  function(req,res){
    Mhs.findOne({nim : req.params.nim}, function(err, mhss){
        if(err)
            res.send(err);
        
        mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
        mhss.nama = req.body.nama;
        mhss.alamat = req.body.alamat;
        mhss.save(function(err){
            if(err)
                res.send(err)
            
            res.json({
                message : 'berhasil mengubah data mahasiswa',
                data : mhss
            })
        })
    })
}