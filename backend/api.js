let mysql  = require('mysql'),
    jwt    = require('jsonwebtoken'),
    config = require('./config').config;

let { getToken, saltHashPassword } = require('./helpers');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'db'
});

connection.connect();

let register = (req, res) => {
    let { username, password } = req.body;

    let { passwordHash, salt } = saltHashPassword(password);

    const query = `INSERT INTO users(username, password, salt) VALUES('${username}', '${passwordHash}', '${salt}')`;

    connection.query(query, (error, user, fields) => {
        if(error) {
            console.error(error);
            return res.status(400).send({
                message: error.toString(),
                ok: false
            })
        }

        let token = jwt.sign({
            username
        }, config.secret, {
            expiresIn: 1440 * 30
        });

        res.send({
            jwt: token,
            ok: true
        });
    })
};

let login = (req, res) => {
    let { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username='${username}'`;

    connection.query(query, (error, user, fields) => {
        if(error){
            console.error(error);
            return res.status(400).send({
                message: error.toString(),
                ok: false
            });
        }

        if(user.length === 0) return res.status(404).send({ message: "User doesn't exist.", ok: false });


        let checkPassword = saltHashPassword(password, user[0].salt);
        console.log(user[0].password, checkPassword);

        if(user[0].password !== checkPassword.passwordHash) return res.status(400).send({ message: 'Wrong password.', ok: false });

        let token = jwt.sign(user[0], config.secret, {
            expiresIn: 1440 * 30
        });

        res.send({
            jwt: token,
            ok: true
        });
    });
};

let checkToken = (req, res) => {
    let token = getToken(req);

    try {
        jwt.verify(token, config.secret);
        res.status(200).send({
            ok: true,
            message: "Token valid."
        })
    } catch (e) {
        res.status(400).send({
            ok: false,
            message: "Token expired or invalid."
        })
    }
};

let sampleGet = (req, res) => {
    let token = getToken(req);
    const query = `SELECT * FROM table`;

    try {
        const decoded = jwt.verify(token, config.secret);

        connection.query(query, (error, results, fields) => {
            if(error) {
                console.error(error);
                return res.status(400).send({
                    message: 'MYSQL error',
                    ok: false
                })
            }

            res.status(200).send(results);
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({error: 'Session expired or unauthorized access.'});
    }
};

let applyRoutes = (app) => {
    app.get('/checkToken', checkToken);
    app.get('/sampleGet', sampleGet);
    app.post('/login', login);
    app.post('/register', register);
};


exports.applyRoutes = applyRoutes;