module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
       let policy = require('./policies/auth')
       pluginContext.registerPolicy(policy)
    },
    policies:['auth'], 
    schema: {  
        "$id":"https://express-gateway.io/schemas/plugins/blacklist.json"
    }
}