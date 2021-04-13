const express = require("express");
const router = express.Router();
const database = require('../Database/db');
const { qrencode } = require('qrencode_mini');
var images = require("images");
const fs = require('fs');

router.route("/login").post(function(request, res, next) {
    var query = 'SELECT id_user AS ID, login_user AS USERNAME, password_user AS PASSWORD from user where login_user="' + request.body.username + '" and password_user="' + request.body.password + '";';
    console.log(query);
    console.log(request.body);
    // database.connection.query(
    //     query,
    //     function(err, results) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(results);
    //             if (results.length > 0) {
    //                 console.log(results[0].ID);
    //                 res.status(200).send({ auth: true, id: results[0].ID });
    //             } else {
    //                 res.status(401).send({ auth: false });
    //             }
    //         }
    //     }
    // );
});

router.route("/signup").post((req, res, next) => {
    var query = 'SELECT login_user AS USERNAME from user where login_user="' + req.body.username + '"';
    console.log(query);
    console.log(req.body);
    // database.connection.query(
    //     query,
    //     function(err, results) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(results);
    //             if (results.length > 0) {
    //                 res.status(500).send({ success: false, error: "Username already exists" });
    //             } else {
    //                 var insertQuery = 'INSERT INTO user (login_user, password_user) values("' + req.body.username + '", "' + req.body.password + '");';
    //                 database.connection.query(
    //                     insertQuery,
    //                     function(errors, rslts) {
    //                         if (errors) {
    //                             res.status(500).send({ success: false, errors: errors });
    //                             console.log(errors);
    //                         } else {
    //                             res.status(200).send({ success: true });
    //                             console.log(rslts);
    //                         }
    //                     }
    //                 );
    //             }
    //         }
    //     }
    // );

    // var query = "SELECT MAX(V) FROM PHASE1";
    // setInterval(() => {
    //     dbconnection.query(query, (errors, results)=>{
    //         if(errors){
    //             console.log(errors);
    //         } else {
    //             console.log(results);
    //         }
    //     })
    // }, 10000);
});

router.route("/merge").get((req, res, next) => {

    images("/home/omar/Desktop/ENSIAS/2A/Projects/android/assets/ticket.png")
        .draw(images("/home/omar/Desktop/ENSIAS/2A/Projects/android/assets/qr.png").resize(90, 90), 75, 55)
        .save("output.jpg");
})

router.route("/createqr").post((req, res, next) => {
    const options = {
        background_color: 'ffffff',
        foreground_color: '000000',
        level: "q", // string, optional, default: "l", LOW, 
        //can be:"m", Medium
        //       "q", Quartile
        //       "h", High
        dot_size: 3, // number, optional, default: 3
        margin: 1, // number, optional, default: 4
        micro: 0, // number, optional, default: 0 
        // if a string to be encoded to the microQR? 0 means "NO", 1 = "YES"
        version: 4 // number, optional, default: 0 
            // can be 0, 1, 2, 3, 4 //for microQR(if micro=1) must be equal to 3 or 4!!!!
    }

    let str = req.body.text;
    let buf = Buffer.from(str);

    qrencode(buf, options).then(function(dayta) {
        var data = 'data:image/png;base64,' + dayta.toString('base64');
        var imageBuffer = decodeBase64Image(data);

        fs.writeFile('./assets/image.jpg', imageBuffer.data, function(err) {
            if (err) console.log(err);
            else {
                images("/home/omar/Desktop/ENSIAS/2A/Projects/android/assets/ticket.png")
                    .draw(images("/home/omar/Desktop/ENSIAS/2A/Projects/android/assets/image.jpg").resize(90, 90), 75, 55)
                    .save("output.jpg");
            }
        });
    }).catch(function(err) {
        console.log('err promise: ', err);
    });
})

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = router;