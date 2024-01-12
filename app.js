const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const app = express();
app.use(express.json());
//let db=null;
//const dbPath = path.join(__dirname,"my_database.db");
const dbPath = path.join("./my_database.db");
const db = new sqlite3.Database("./my_database.db",sqlite3.OPEN_READWRITE,(err) => {
    if(err) return console.error(err.message);
    
    console.log("connection successful");
});
/*
db.all('SELECT * FROM player', (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});
const initializeDbAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        console("db connected");
        
    } catch(e) {
        console.log(`DB error: ${e.message}`)
        process.exit(1);
    }
    app.listen(3000, () => console.log("Server running at http://localhost:3000/"));
    
}
initializeDbAndServer();
console.log(db); */
db.run(`CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
} 

// const deleteSql = `delete from todos`;
// db.run(deleteSql,(err) => {
//     if(err) return console.error(err.message);

//     console.log("all rows deleted");
// }) 

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,"public")))
const arr=[];
let totalRows=[];
app.get("/home",(req,res) => {
    res.render("index.ejs",{title:"template Engine"})
})

const sql= `select * from todos`;
db.all(sql,[], (err,rows) =>{
    if(err) return console.error(err.message);
    totalRows = rows;
    rows.forEach((row) => {
        console.log(row);
        consol
    
    });
});

app.post("/addTask",(req,res) => {
    console.log(req.body.todoTask)
    arr.push(req.body.todoTask)
    insertData(req.body.todoTask);
    console.log(totalRows);
    res.render("index.ejs",{arr1:arr,total:totalRows})
})


app.listen(4000, () => console.log("Server running at http://localhost:4000/"));
