const express = require('express');
const app = express();
const port = 3000;

const workingHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();


    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

app.use(workingHoursMiddleware);


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
