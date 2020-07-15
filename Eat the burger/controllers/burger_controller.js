var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
      // var hbsObject = {
      //   burgers: data
      // };
      var wishToEat = data.filter(burger=>burger.devoured == 0);
        var devoured = data.filter(burger=>burger.devoured == 1);
        var allBurgers = {
            wiskToEat : wishToEat,
            devoured : devoured
        }
      // console.log(hbsObject);
      res.render("index", allBurgers);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    console.log (req.body.name)
    burger.create(req.body.name, function(result) {
      console.log (result);
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var id =  req.params.id;
  
    console.log(id)
    
  
    burger.update(id, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  

  
  // Export routes for server.js to use.
  module.exports = router;