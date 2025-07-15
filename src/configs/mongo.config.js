"use strict"


const dev = {
    app: {
        port: process.env.PROT || 3052
    },
    db: {
        host: process.env.HOST || "localhost",
        port: process.env.DB_PORT || 21017,
        name: process.env.DB_NAME || "jmeter-testing"
    }
}


const config = { dev }
const env = process.env.NODE_ENV || "dev"

export default config[env]