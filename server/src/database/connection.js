const dbConnection = {
    cnc: async (mysql, config, query) => {

        const connection = await mysql.createConnection(config);

        // query database
        const [rows, fields] = await connection.execute(query);

        connection.end();

        return res = {
            rows, fields
        }


    }
}


module.exports = dbConnection;