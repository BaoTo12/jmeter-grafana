"use strict"

import config from "../configs/mongo.config.js"
import mongoose from "mongoose";
// const connectionString = `mongodb://${host}:${port}/${name}`
// const connectionString = `mongodb://localhost:21017/jmeter-testing`

const { db: { host, port, name } } = config
const connectionString = `mongodb://${host}:${port}/${name}`


class Database {

    constructor() {
        this.connect()
    }
    connect() {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", { color: true })
        }

        mongoose.connect(connectionString, {
            maxPoolSize: 100
        })
            .then(_ => {
                countConnect()
                console.log("Connect MongoDB Successfully 🌟")
            })
            .catch(_ => console.log("Error While Connecting MongoDB ❌"))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }


}
const mongoDbInstance = Database.getInstance();
export default mongoDbInstance