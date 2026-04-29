import express from 'express';
import expressLayouts from 'express-ejs-layouts';

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.get('/', (req, res) => {
    res.render('index', { title : 'Inicio' });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})