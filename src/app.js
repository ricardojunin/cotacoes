// Conteúdo node
const path = require('path');

// Conteúdo NPM
const express = require('express');
// Conteúdo HBS
const hbs = require('hbs');

const cotacoes = require('./util/cotacao')

// Como boa prática importar primeiro os pacotes do node e depois os do npm

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index', {
        titulo : 'Conteúdo dinâmico',
        autor : 'João Ricardo de Oliveira Alves'
    });
});

app.get('/about',(req, res)=>{
    res.render('about', {
        titulo : 'Sobre',
        autor : 'João Ricardo de Oliveira Alves'
    });
});

app.get('/help',(req, res)=>{
    res.render('help', {
        titulo : 'Ajuda',
        autor : 'João Ricardo de Oliveira Alves'
    });
});

app.get('/cotacoes',(req, res)=>{
    if(!req.query.ativo){
        return res.status(400).json({error : {
            message : 'O ativo deve ser informado',
            code : 400
        }});
    }
    const symbol = req.query.ativo.toUpperCase();
    cotacoes(symbol, (err, body)=>{
        if(err){
            return res.status(err.code).json({error : {
                message : err.message,
                code : err.code
            }});
        }
        return res.status(200).json(body);
    });
});

app.get('*',(req, res)=>{
    res.render('404',{
        titulo : 'Conteúdo dinâmico',
        autor : 'João Ricardo de Oliveira Alves',
        errorMessage : 'Página não encontrada'
    });
});

//Aqui é definido o servidor cuja porta default do node é a 3000
app.listen(3000, ()=>{
    console.log('Server is running on port 3000.');
});