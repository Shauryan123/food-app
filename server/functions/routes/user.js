const express = require("express");
const admin = require("firebase-admin");
const { getAuth } = require("firebase/auth");

const router = express.Router();

let data = [];


router.get('/', (req, res) => {

    return res.send("Inside the User Router");

})

router.get('/jwtVerification', async(req, res) => {

    // return res.send("JWT");

    if (!req.headers.authorization) {

        return res.status(500).send({ msg: "Token not Found" })
    }

    const token = req.headers.authorization.split(" ")[1];

    // return res.status(2 00).send({ token: token })

    try {

        const decodedValue = await admin.auth().verifyIdToken(token);

        if (!decodedValue) {

            return res.status(500).json({ success: false, msg: `Unauthorized Access` });
        }

        return res.status(200).json({ success: true, data: decodedValue });
    } catch (err) {

        return res.send({ success: false, msg: `
                                Error in extracting the token: $ { err }
                                ` });

    }



})

const listAllUsers = async(nextpagetoken) => {
    admin
        .auth()
        .listUsers(1000, nextpagetoken)
        .then((listuserresult) => {
            listuserresult.users.forEach((rec) => {
                data.push(rec.toJSON());
            });
            if (listuserresult.pageToken) {
                listALlUsers(listuserresult.pageToken);
            }
        })
        .catch((er) => console.log(er));
};

listAllUsers();

router.get("/all", async(req, res) => {
    listAllUsers();
    try {
        return res
            .status(200)
            .send({ success: true, data: data, dataCount: data.length });
    } catch (er) {
        return res.send({
            success: false,
            msg: `Error in listing users :,${er}`,
        });
    }
});
module.exports = router;