exports.wr = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.error(err);
        if (err.isBoom) {
            const { payload } = err.output
            res.status(payload.statusCode).send(payload.message);
        } else {
            res.status(500).send('Erreur du serveur');
        }
    }
};