const express = require('express');
const router = express.Router();

const { Diet } = require('../db.js');

// Arrays de tipos de recetas
const Alltypes = [
    {name: "vegetarian"},
    {name: "vegan"},
    {name: "gluten free"},
    {name: "dairy free"},
    {name: "lacto ovo vegetarian"},
    {name: "paleolithic"},
    {name: "primal"},
    {name: "pescatarian"},
    {name: "fodmap friendly"},
    {name: "whole 30"},
    {name: "ketogenic"},
]


// GET tipos de dietas
// http://localhost:3001/types
router.get('/', async (req, res, next) => {
    try {
        const types = await Diet.findAll();
        if(types.length > 0){
            res.json(types);
        }else{
            const tipos = await Diet.bulkCreate(Alltypes);
            console.log("creado")
            res.json(tipos);
        }
    }catch(error){
        next(error)
    }
})

module.exports = router;

