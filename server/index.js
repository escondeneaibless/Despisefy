const mysql = require("mysql2");
const express = require("express");
const formidable = require('formidable');
const bcrypt = require('bcrypt')
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mv = require("mv");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const port = 5000;
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(express.json()); app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.set("view engine", "hbs");
const urlencodedParser = express.urlencoded({ extended: false });
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "despisefy",
  password: "",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/fileForUsers');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

//Displaying the list of users from the admin
app.get('/client', async (req, res) => {
  const sql1 = "SELECT * FROM Users";
  const sql2 = "SELECT * FROM forms";
  try {
    pool.query(sql1, (err, result) => {
      if (err) { res.send(err) };
      pool.query(sql2, (err, results) => {
        if (err) { res.send(err) };
        res.send([{ "user": result }, { "form": results }]);
      })
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Update role form users
app.post("/registration", urlencodedParser, function (req, res) {
  const form = formidable({ multiples: false });;
  form.parse(req, (err, forms, form) => {
    if (err) { console.log(err) };
    const hashedPassword = bcrypt.hashSync(forms[2], 7);
    pool.query('INSERT INTO users (name, phone, password) VALUES (?,?,?)', [forms[0], forms[1], hashedPassword], (err, result) => {
      if (err) { console.log(err) };
      res.send(result);
    });
  })
});

// Authentication 
app.post("/login", function (req, res) {
  const form = formidable({ multiples: false });
  form.parse(req, (err, file, files) => {
    pool.query("SELECT * FROM users ", (err, result) => {
      if (err) { res.send(err) }
      if (file) {
        console.log(result.length);
        for (let i = 0; i< result.length; i++) {
          console.log(result[i].phone)
          if (file[0] == result[i].phone && bcrypt.compareSync(file[1], result[i].password)) {
            res.send('Вход выполнен')

          }
        }
        
      }
    })
  });
})
app.get("/basket", function (req, res) {
  pool.query("SELECT * FROM products", (e, result) => {
    res.send(result);
  }
  )
})
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    res.send(result);
  })
})
app.post("/users", function (req, res) {
  const form = formidable({ multiples: false });
  form.parse(req, (err, file, files) => {
    pool.query(file[3], [file[2], file[1]], (err, result) => {
      if (err) { res.send(err) }
      console.log(file);
    })
  });
})
app.get("/products", (req, res) => {
  pool.query("SELECT * FROM products", (err, result) => {
    if (err) { console.log(err) }
    res.send(result);
  })
})

app.post("/admin/products", (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, fields, files) => {
    if (fields[0] === "delete") {
      console.log(fields);
      pool.query(fields[2], [fields[1]], (err, result) => {
        if (err) { console.log(err) };
        console.log("deleted")
      })
    } else {
      console.log(fields);
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }
      const { image } = files;
      function generateUniqueFileName(fileExtension) {
        const uniqueFilename = uuidv4();
        return uniqueFilename + fileExtension;
      }
      const oldFilePath = image.originalFilename;
      const fileExtension = path.extname(oldFilePath);
      const newFileName = generateUniqueFileName(fileExtension);
      const newFilePath = path.join((`${__dirname}/fileForUsers/${newFileName}`), newFileName);
      fs.rename(oldFilePath, newFilePath, (error) => {
        if (error) {
          console.error('Ошибка при переименовании файла:', error);
        } else {
          console.log('Файл успешно переименован.');
        }
      });
      mv(
        image.filepath,
        (`${__dirname}/fileForUsers/${newFileName}`),
        (err) => {
          console.log("file was uploaded");
        }
      );
      pool.query("INSERT INTO products (name, price, photo) VALUES (?,?,?)", [fields.name, fields.price, newFileName], (error, result) => {
        if (error) { console.log(error); }
        console.log('ok');
        res.send(result);
        return;
      });
    }


    // }

  });
});

app.post("/admin/products", urlencodedParser, (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, forms, form) => {
    if (err) { console.log(err) };
    console.log(forms);

  })
});
app.listen(port, function () {
  console.log(`Сервер ожидает подключения на порту ${port}`);
});



