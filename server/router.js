module.exports = (logger, functions) => {
    const express = require('express');
    const router = express.Router();

    router.post('/get-settings', (req, res) => {
        functions.getSettings(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }
            res.send(result.settings);
        });
    });
    router.post('/set-settings', (req, res) => {
        functions.setSettings(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }

            if (result.responseCode === 200) {
                functions.getSettings().then(result => {
                    if (result.responseCode === 500) {
                        res.status(500).send(result.message);
                        return;
                    }

                    if (result.responseCode === 200) {
                        res.send(result.settings);
                    }
                });
            }
        });
    });
    router.post('/get-izbran-uporabnik', (req, res) => {
        functions.getIzbranUporabnik(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }
            res.send(result.uporabnik);
        });
    });
    router.post('/ustvari-uporabnika', (req, res) => {
        functions.ustvariUporabnika(req.body).then(result => {
            if (result.responseCode === 500) {
                res.send(result.message);
                return;
            }

            if (result.responseCode === 200) {
                functions.getUporabniki().then(result => {
                    if (result.responseCode === 500) {
                        res.status(500).send(result.message);
                        return;
                    }

                    if (result.responseCode === 200) {
                        res.send(result.uporabniki);
                    }
                });
            }
        });
    });

    router.post('/uredi-uporabnika', (req, res) => {
        functions.urediUporabnika(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }

            if (result.responseCode === 200) {
                functions.getUporabniki().then(result => {
                    if (result.responseCode === 500) {
                        res.send(result.message);
                        return;
                    }

                    if (result.responseCode === 200) {
                        res.send(result.uporabniki);
                    }
                });
            }
        });
    });

    // Get meritve splošno mora biti vedno parametrično - osnovni filter
    router.post('/check-admin', (req, res) => {
        functions.checkAdmin(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }

            if (result.admin.length > 0) {
                delete result.admin[0].Geslo;
            }
            res.send(result.admin);
        });
    });

    router.post('/clear-admin', (req, res) => {
        functions.clearAdmin().then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }
            res.send(result.clearAdmin);
        });
    });


    router.post('/popravi-podatke', (req, res) => {
        functions.popraviPodatke(req.body).then(result => {
            if (result.responseCode === 500) {
                res.status(500).send(result.message);
                return;
            }
            res.sendStatus(result.responseCode);
        });
    });

    return router;
};