import express from "express";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

const app = express();
//config para receber form
app.use(express.urlencoded({extended: true})); //o corpo (body) da requisição
app.use(express.json()); //converter as infos enviadas para json

app.set("view engine", "ejs") //reconhecer o ejs como motor de vizualização
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));

let pokedex = [{
    index: 1,
    number: 74,
    name: "Geodude",
    type: ["Rock","Ground"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png",
    desc: "Commonly found near mountain trails and the like. If you step on one by accident, it gets angry.",
    weight: "20.0",
    height: "0.4",
    category: "Rock",
    abilities: ["Rock Head", "Sturdy"] 
},
{
    index: 2,
    name: "Gyarados",
    number: 130,
    type: ["Water","Flying"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png",
    desc: "It has an extremely aggressive nature. The Hyper Beam it shoots from its mouth totally incinerates all targets.",
    weight: "235.0",
    height: "6.5",
    category: "Atrocious",
    abilities: ["Intimidate"]
},
{
    index: 3,
    number: 68,
    name: "Machamp",
    type: ["Fighting"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/068.png",
    desc: "It quickly swings its four arms to rock its opponents with ceaseless punches and chops from all angles.",
    weight: "130.0",
    height: "1.6",
    category: "Superpower",
    abilities: ["Guts", "No Guard"]
},
{
    index: 4,
    name: "Charizard",
    number: 6,
    type: ["Fire","Flying"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    desc: "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    weight: "90.5",
    height: "1.7",
    category: "Flame",
    abilities: ["Blaze"]
},
{
    index: 5,
    name: "Blastoise",
    number: 9,
    type: ["Water"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
    desc: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    weight: "85.5",
    height: "1.6",
    category: "Shellfish",
    abilities: ["Torrent"] 
},
{
    index: 6,
    name: "Pidgeot",
    number: 18,
    type: ["Normal", "Flying"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/018.png",
    desc: "This Pokémon flies at Mach 2 speed, seeking prey. Its large talons are feared as wicked weapons.",
    weight: "39.5",
    height: "1.5",
    category: "Bird",
    abilities: ["Keen Eye", "Tangled Feet"] 
},
{
    index: 7,
    name: "Mankey",
    number: 56,
    type: ["Fighting"],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/056.png",
    desc: "An agile Pokémon that lives in trees. It angers easily and will not hesitate to attack anything.",
    weight: "28.0",
    height: "0.5",
    category: "Pig Monkey",
    abilities: ["Vital Spirit", "Anger Point"]
}]

app.get ("/", (req, res) => {
    //o express ja reconhece a pasta views sozinho, ent so colocamos o nome do arquivo
    res.render("index.ejs", {pokedex})
});

app.get("/details/:id", (req, res) => {
    pokedex.filter((obj) => {
        if (obj.index == req.params.id){
            let pokemon = obj;
            res.render("details.ejs", {
                pokemon
            })
        }
    })
})

app.get("/register", (req, res) =>{
    res.render("register.ejs")
})

app.post('/register', (req, res) => {
    let i = pokedex[pokedex.length - 1].index + 1;
    const {name, type1, image, desc, category, abilities1, weight, height, number } = req.body;
    const type = type1.split("-");
    const abilities = abilities1.split("-");
    pokedex.push({index: i, name, type, image, desc, category, abilities, weight, height, number});
    console.log(pokedex)
    res.redirect("/");
})