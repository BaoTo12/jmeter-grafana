"use strict"

import config from "../configs/mongo.config.js"
import mongoose from "mongoose";

const { db: { host, port, name } } = config
const connectionString = `mongodb://${host}:${port}/${name}`

console.log({ connectionString });


class Database {

    constructor() {
        this.connect()
    }
    connect(type = "mongo") {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", { color: true })
        }

        mongoose.connect(connectionString, {
            maxPoolSize: 100
        })
            .then(_ => {
                console.log("Connect MongoDB Successfully 🌟")
            })
            .catch(err => {
                console.log("Error While Connecting MongoDB ❌")
                console.log({ err });

            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance;
    }


}
const mongoDbInstance = Database.getInstance();
export default mongoDbInstance