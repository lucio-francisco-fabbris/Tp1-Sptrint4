import express, { text } from 'express';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layout');

const navbar = [
    {text: 'Inicio', href: '/'},
    {text: 'Acerca de', href: '/superheroes'},
    {text: 'Agregar', href: '/add'}
];

let superheroes = []

app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio', navbar });
});

app.get('/superheroes', (req, res) => {
    res.render('superheroes', {title: 'Lista', navbar, superheroes, success: req.query.success });
});

app.get('/add', (req, res) => {
    res.render('addSuperhero', {title: 'Agregar', navbar, error: null});
});

app.post('/add', (req, res) => {
    const { nombre } = req.body;

    console.log(superheroes);

    if (!nombre || nombre.trim() === '') {
        return res.render('addSuperhero', {title: 'Agregar', navbar, error: 'El nombre es obligatorio'});
    }
    superheroes.push({ nombre });

        res.redirect('/superheroes?success=1');
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.index;

    superheroes.splice(index, 1);

    res.redirect('/superheroes');
});

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;

    res.render('editSuperhero', {title: 'Editar', navbar, hero: superheroes[index], index});
});

app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    const { nombre } = req.body;

    superheroes[index].nombre = nombre;

    res.redirect('/superheroes');

})




app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});