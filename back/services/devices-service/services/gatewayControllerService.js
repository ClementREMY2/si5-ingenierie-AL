const { notFound } = require("@hapi/boom");

const { sendMessage } = require("../async/mqtt");
const { pool } = require('../lib/db');


exports.getAllDevices = async () => {
  const result = await pool.query(getAllDevicesQuery);
  return result.rows;
};

exports.sendRealtime = async (gatewayId, realtimeState) => {
    const gateway = await pool.query(`SELECT * FROM gateway_devices WHERE device_id = $1`, [gatewayId]);
    if (gateway.rows.length === 0) {
        throw notFound(`Gateway with id ${gatewayId} not found`);
    }

    // Update gateway state in database
    const newRealtime = realtimeState.state === "enabled";
    await pool.query(`UPDATE gateway_devices SET realtime_enabled = $1 WHERE device_id = $2`, [newRealtime, gatewayId]);

    sendMessage(`gateway/${gatewayId}/realtime`, realtimeState);
}