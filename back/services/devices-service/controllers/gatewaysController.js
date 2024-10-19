const gatewayControllerService = require('../services/gatewayControllerService');
const { wr } = require('../lib/wrapRequest');

exports.putRealtime = wr(async (req, res) => {
    const { gatewayId } = req.params;
    const { state: realtimeState } = req.body;
    await gatewayControllerService.sendRealtime(gatewayId, { state: realtimeState });
    res.sendStatus(200);
});