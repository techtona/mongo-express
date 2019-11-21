let redis = require('../redisClient');
Mhs = require('../models/mahasiswaModel');

exports.indexRedis = function (req, res) {
    // apakah ada di redis
    redis.get('semua-mahasiswa-1', function (err, reply) {
        if (err)
            res.json(null)
        // yes, ada di redis
        else if (reply)
            res.json(JSON.parse(reply))
        // no, tidak ada di redis
        else {
            Mhs.get(function (err, mhs) {
                if (err)
                    res.json(null)
                else {
                    //save dulu di redis
                    redis.set('semua-mahasiswa-1',JSON.stringify({from : 'redis-server',mhs}))
                    res.json(mhs)
                }
            })
        }
    })
}

exports.index = function (req, res) {
    Mhs.get(function (err, mhs) {
        if (err) {
            res.json({
                status: 'error',
                message: err
            })
        }
        res.json({
            status: 'success',
            data: mhs
        })
    })
}

exports.store = function (req, res) {
    var mhss = new Mhs();
    mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
    mhss.nama = req.body.nama;
    mhss.alamat = req.body.alamat;
    mhss.save(function (err) {
        if (err)
            res.json(err)

        res.json({
            message: 'tambah data berhasil',
            data: mhss
        })
    })
}

exports.update = function (req, res) {
    Mhs.findById(req.params.id, function (err, mhss) {
        if (err)
            res.send(err);

        mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
        mhss.nama = req.body.nama;
        mhss.alamat = req.body.alamat;
        mhss.save(function (err) {
            if (err)
                res.send(err)

            res.json({
                message: 'berhasil menambah data',
                data: mhss
            })
        })
    })
}

exports.updateByNim = function (req, res) {
    Mhs.findOne({ nim: req.params.nim }, function (err, mhss) {
        if (err)
            res.send(err);

        mhss.nim = req.body.nim ? req.body.nim : mhss.nim;
        mhss.nama = req.body.nama;
        mhss.alamat = req.body.alamat;
        mhss.save(function (err) {
            if (err)
                res.send(err)

            res.json({
                message: 'berhasil mengubah data mahasiswa',
                data: mhss
            })
        })
    })
}

exports.deleteByNim = function (req, res) {
    Mhs.remove({
        nim: req.params.nim
    }, function (err, mhss) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'siswa deleted'
        });
    });
};