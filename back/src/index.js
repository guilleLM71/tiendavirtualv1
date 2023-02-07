import app from "./app";
import { db } from "./firebase";


app.listen(app.get("port"));
//console.log('db :>> ', db);

console.log("Server on port", app.get('port'));