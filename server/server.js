var express = require("express");
var cors = require('cors');
var app = express();

app.use(cors());

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/api/trips", (req, res, next) => {
    res.json([
        {
            "fromName": "Berlin, Germany",
            "toName": "Kyiv, Ukraine",
            "departAt": "2019-05-29T00:00:00.000Z",
            "vehicle": "plane"
        },
        {
            "fromName": "Berlin, Germany",
            "toName": "Dnipro, Ukraine",
            "departAt": "2019-06-02T00:00:00.000Z",
            "vehicle": "car"
        },
        {
            "fromName": "London, UK",
            "toName": "Kyiv, Ukraine",
            "departAt": "2019-06-07T00:00:00.000Z",
            "vehicle": "plane"
        },
        {
            "fromName": "Lyon, France",
            "toName": "Kyiv, Ukraine",
            "departAt": "2019-06-07T00:00:00.000Z",
            "vehicle": "plane"
        },
        {
            "fromName": "Moscow, Russia",
            "toName": "Kyiv, Ukraine",
            "departAt": "2019-06-08T00:00:00.000Z",
            "vehicle": "car"
        },
        {
            "fromName": "Kyiv, Ukraine",
            "toName": "Berlin, Germany",
            "departAt": "2019-05-30T00:00:00.000Z",
            "vehicle": "train"
        }
    ]);
});
