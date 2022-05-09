const express = require('express');
const router = express.Router();

//Llamo al modelo recipe
const { Recipe, Diet, Op } = require('../db.js')

//Funcion que devuelve todos los recipes 100 en total
const { AllRecipes , getRecipe } = require('../controllers/recipe');

//constante con una expresion regular para verificar si un dato es UUIDV4 o no
const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

//Get all recipes o buscar por nombre 
//http://localhost:3001/recipes?name=pizza
router.get('/', async (req, res, next) => {
    //llamo al nombre que obtengo por query
    const dato = req.query.name;

   // En caso de no tener nada en la query, devuelvo todos los recipes
    if(!dato){
        try {
            //obtengo todos los recipes desde la api
            const recipes = await AllRecipes();
            //obtengo todos los recipes desde la base de datos
            const recipesDB = await Recipe.findAll({include: [{ model: Diet }]})
            
            //condicional donde si tengo recipes de la base de datos
            if(recipesDB){
                // concateno ambos resultados y los muestro
                const recipesAll = recipes.concat(recipesDB);
                res.json(recipesAll);
            }else{
                //si no tengo recipes de la base de datos muestro solo los de la api
            res.json(recipes);
            }
        } catch (error){
            next(error)
        }
    //En caso de si tener algo en la query, devuelvo los recipes que coincidan con el nombre    
    }else{
        const name = dato.toLowerCase();
        try {
            //llamo a todas las recetas que tengo cargadas en la base de datos que contengan en el nombre
            //lo que llego por query, y que incluya sus tipos de dieta
            const recipeDB = await Recipe.findAll({
                where:{name : {
                    [Op.iLike]: `%${name}%`
                  } 
            }, include: {
                model: Diet
            }});
    
            //llamo a todas las recetas que tengo desde la api
            const recipeAPI = await AllRecipes();
    
            //Busco las recetas que contengan en el nombre lo que llego por query
            //a mis resultado de la api
            const recipe = recipeAPI.filter((r) => {
                if(r.name.toLowerCase().includes(name)){
                    return r;
                }
            });
    
            //guardo los 2 resultado en una variable
            const recipeAll = recipe.concat(recipeDB);
    
            //Genero un condicional donde si tengo resultados los muestro, si no, muestro un mensaje
            if(recipeAll.length > 0){
                res.json(recipeAll); 
            }else{
                res.send('false');
            }
        }catch(error){
            next(error);
        }
    }
});

//Get one recipe
//http://localhost:3001/recipes/:id

router.get('/:id', async (req, res, next) => {
    //obtengo el id que llego por parametro
    const { id } = req.params;
    try {
        //verifico si el id es un UUIDV4
        if(regexExp.test(id)) {
            try{
                //obtengo la receta de la base de datos
                const recipeDB = await Recipe.findByPk(id, {include: [{ model: Diet }]});
                //si tengo la receta de la base de datos la muestro
                if(recipeDB){
                    res.json(recipeDB);
                }else{
                    //si no tengo la receta de la base de datos la busco en la api
                    res.send('No se encontro la receta');
                }
            }catch(error){
                next(error);
            }
        }else{
           try{
                //obtengo la receta de la api
                const recipe = await getRecipe(id);
                //si tengo la receta de la api la muestro
                if(recipe){
                    res.json(recipe);
                }else{
                    //si no tengo la receta de la api mando un mensaje donde no se encontro la receta
                    res.send('No se encontro la receta');
                }
           }catch(error){
               next(error);
           }
        }
    } catch (error) {
        next(error);
    }
})

//Post crear una receta 
//http://localhost:3001/recipes
router.post('/', async (req, res, next) => {
    try{
        //llamo a todos los datos que obtengo de body
        const { name, description, puntuation, level, steps, image, diet } = req.body;

        //llamo a todas las recetas que tengo cargadas en la base de datos
        const recipes = await Recipe.findAll();
        //llamo a todos los que tengo desde la api
        const recipesAPI = await AllRecipes();

        //Busco los tipos de dieta cargados
        const types = await Diet.findAll({
            where: { name: diet }})

        //Creo un condicional donde no permito crear 2 recetas con el mismo nombre
        if(recipes.find(recipe => recipe.name === name) || recipesAPI.find(recipe => recipe.name === name)){
            res.send('Ya existe una receta con ese nombre')
        }else{ 
        //En caso de que el nombre sea otro creo una nueva receta    
            const recipe = await Recipe.create({
                name,
                description,
                puntuation,
                level,
                steps,
                image
            });

            //Creo una relacion entre la receta y el tipo de dieta
            await recipe.addDiet(types);
            res.json(recipe);
        }
    }catch(error){
        next(error)
    }
});



module.exports = router