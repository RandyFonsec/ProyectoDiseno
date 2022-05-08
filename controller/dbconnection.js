const mysql = require ('mysql');

module.exports = () => {
    return mysql.createConnection ({
        host: 'bgtvabkkjjkeiuxdcsho-mysql.services.clever-cloud.com',
        user: 'uuldy6gaj5thwaat',
        password: 'BxP8faHmKVp5CUXCsU4h',
        database: 'bgtvabkkjjkeiuxdcsho'
    }); 
}