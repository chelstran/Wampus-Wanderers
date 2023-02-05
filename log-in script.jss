const Logs = require('./models/LogActivity');
const Users = require('./models/Users');
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    passHash: {type: String}
})

const Users = mongoose.model("User", UserSchema)

module.exports = Users

        //register - add new user
        App.post("/api/newuser/", async (req, resp) => {
            const check = await Users.find({
                "username": req.body.username
            });

            console.log(check.length)

            if(check.length === 0) {
                const log = await Users.create({
                    "username": req.body.username,
                    "first_name": req.body.first_name,
                    "last_name": req.body.last_name,
                    "passHash": req.body.password
                })
                // console.log("successful post")
                resp.send(req.body)
            } else {
                // console.log("bad try")
                resp.send({})
            }
          })

        //login - check if user exists and sign in
        App.post("/api/signin/", async (req, resp) => {
            console.log("inside post for login")
          try{
            const users = await Users.find({
                "username": req.body.username,
                "passHash": req.body.password
            })
            console.log(users)
            // return resp.json(users[0])
            if(users.length > 0) console.log("user found")
            return (users.length > 0) ? resp.json(users[0]) : resp.json({});
          }
          catch{
              console.log("got error")
              resp.send("Error")
          }
        })
