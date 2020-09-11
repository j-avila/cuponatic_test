import mysql from "mysql";

export default class MySQL {
  private static _instance: MySQL;

  connection: mysql.Connection;
  connected: boolean = false;

  constructor() {
    console.log("class initialized");

    this.connection = mysql.createConnection({
      host: "localhost",
      port: 6603,
      user: "root",
      password: "root",
      database: "cuponatic",
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static execQuery(query: string, callback: Function) {
    this.instance.connection.query(query, (err, results: object[], fields) => {
      if (err) {
        console.log("error en el query po");
        return callback(err);
      }
      if (results.length === 0) {
        callback("El registro esta vacio");
      } else {
        callback(null, results);
      }
    });
  }

  private connectDB() {
    this.connection.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.connected = true;
      console.log("database connected!");
    });
  }
}
