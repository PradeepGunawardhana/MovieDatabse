const router = require("express").Router();
const User = require("../model/userModel");

router.route("/new").post((req, res) => {

    const { fname, lname, email, password } = req.body;

    const newUser = new User({ fname, lname, email, password });

    newUser.save().then(() => {

            res.status(200).json("User added.");

        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred while adding the user." });
        });
        
});




router.route("/get").post((req, res) => {
    
    const { email } = req.body; 

    User.findOne({ email })
        .then((response) => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "User not found." });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching the user." });
        });
});

module.exports = router;
