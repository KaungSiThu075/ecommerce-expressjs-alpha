const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
    db: process.env.MONGODB_CLUSTER_STRING
}