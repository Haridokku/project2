const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const app = express();
app.use(express.json());
let db=null;
const dbPath = path.join(__dirname,"my_database.db");
const initializeDbAndServer = () => {
    try{
        db = open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => console.log("Server running at http://localhost:3000/"))
    } catch(e) {
        console.log(`DB error: ${e.message}`)
        process.exit(1);
    }
    
}
initializeDbAndServer();

/*db.run(`CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY,
    item VARCHAR(200)
)`);

const insertData = (name) => {
    const sql = `INSERT INTO todos(item) VALUES (?)`;
    db.run(sql,name,(err) => {
        if(err) {
            console.log(err.message);
        }
        else{
            console.log(`Inserted ${name} into the database`);
        }
    })
} */
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,"public")))
const arr=[];

app.get("/home",(req,res) => {
    res.render("index.ejs",{title:"template Engine"})
})

app.post("/addTask",(req,res) => {
    console.log(req.body.todoTask)
    arr.push(req.body.todoTask)
    res.render("index.ejs",{arr})
})