const app = require('./src');

const PORT = process.env.PORT || 4001;

app.get('/', (req, res, next) => {
    res.status(200).send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});