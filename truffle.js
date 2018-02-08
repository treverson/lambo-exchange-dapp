module.exports = {
    networks: {
        dev: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network
        },
        rinkeby: {
            host: "localhost",
            port: 8545,
            network_id: 4
        }
    }
};