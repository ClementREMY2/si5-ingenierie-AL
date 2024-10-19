const { sendMessage } = require("../async/mqtt");

exports.sendRealtime = async (gatewayId, realtimeState) => {
    sendMessage(`gateway/${gatewayId}/realtime`, realtimeState);
}