const express = require("express")

const app = express()
const pokemon = require("./models/pokemon.json");

app.set("view engine", "ejs")
app.set('views', __dirname + '/views');

app.get("/", (req,res) => {
    res.send("Welcome 99 Pokemon")
})

app.get("/:verb/:adj/:noun", (req,res) => {
    const { verb, adj, noun } = req.params
    res.send(`Congratulations on starting a new project called ${verb}-${adj}-${noun}!`)
})

app.get("/bugs", (req, res) => {
    const bugCount = 99;
    res.send(`
      ${bugCount} little bugs in the code
      <br>
      <a href="/bugs/${bugCount + 1}">Pull one down, patch it around</a>
    `);
  });
  
app.get("/bugs/:bugCount", (req, res) => {
    const { bugCount } = req.params;
  
    if (+bugCount > 199) {
      res.send(`Too many bugs!! Start over!`);
    } else {
      res.send(`
    ${bugCount} little bugs in the code, ${bugCount} little bugs in the code ${bugCount} little bugs <a href="/bugs/${+bugCount + 2}">Pull one down, patch it around</a>`);
    }
});




app.get("/pokemon", (req, res) =>{
    res.send(pokemon)
})


app.get("/pokemon/search", (req, res) => {
    const { name } = req.query;
    const thePokemon = pokemon.find(poke => poke.name.toLowerCase() === name.toLowerCase());
    console.log(thePokemon)
    if (thePokemon) {
      res.send([thePokemon]);
    } else {
      res.send([]);
    }
  });
app.get("/pokemon/:indexOfArray", (req, res) =>{
    const { indexOfArray } = req.params

    if(pokemon[indexOfArray] ===  undefined){
        res.send(`Sorry, no pokemon found at ${indexOfArray}`)
    }
    res.send(pokemon[indexOfArray])
})

app.get("/pokemon-pretty", (req,res) =>{
    res.render("pokemon", { pokemon: pokemon });

})
app.get("/pokemon-pretty/:name", (req, res) => {
    const name = req.params.name;
    const selectedPokemon = pokemon.find(poke => poke.name === name);
    if (!selectedPokemon) {
      res.status(404).send("Pokemon not found");
    } else {
      res.render("pokemonDetails", { pokemon: selectedPokemon });
    }
  })

module.exports = app