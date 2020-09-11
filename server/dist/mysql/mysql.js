"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.connected = false;
        console.log("class initialized");
        this.connection = mysql_1.default.createConnection({
            host: "localhost",
            port: 6603,
            user: "root",
            password: "root",
            database: "cuponatic",
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static execQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log("error en el query po");
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro esta vacio");
            }
            else {
                callback(null, results);
            }
        });
    }
    connectDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log("database connected!");
        });
    }
}
exports.default = MySQL;
