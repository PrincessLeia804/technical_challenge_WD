const express = require("express");
const app = express();
const phoneDetails = require("./data/phones.json")

app.get("/phones", (req, res) => {
    res.json(phoneDetails)
})

app.get("/phones/:id", (req, res) => {
    const phoneId = parseInt(req.params.id)

    try {
        const phone = phoneDetails.find((phone) => phone.id === phoneId)
        if(phone){
            console.log("Success", phone);
            res.json(phone)
        } else {
            console.log("No data")
        }
    } catch (error) {
        res.status(404).json({error: "Phone could not be found"})
    }
})


module.exports = app;