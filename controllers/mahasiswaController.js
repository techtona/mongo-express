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

exports.update = function(req, res){
    Mhs.findById(req.params.id, function(err, mhss){
        if(err)
            res.send(err);
        
        mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
        mhss.nama = req.body.nama;
        mhss.alamat = req.body.alamat;
        mhss.save(function(err){
            if(err)
                res.json(err)
            
            res.json({
                message : 'update success',
                data : mhss
            })
        })
    })
}

exports.view = function(req, res){
    // Mhs.findById(req.params.id, function(err, mhss){
    //     if(err)
    //         res.send(err);
                
    //     res.json({
    //         message : 'view mahasiswa',
    //         data : mhss
    //     })
    // })

    Mhs.find({
        nim : req.params.id
    }, function(err, mhss){
        if(err)
            res.send(err)
        res.json({data : mhss})
    })
}

exports.destroy =  function(req, res){
    Mhs.remove({
        _id : req.params.id
    }, function(err, mhss){
        if(err)
            res.send(err)
        res.json({
            status : "sukses",
            message : "Mahasiswa terhapus"
        })
    })
} 