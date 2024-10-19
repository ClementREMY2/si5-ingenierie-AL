exports.wr = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
};