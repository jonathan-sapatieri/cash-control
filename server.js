const app = require('./src');
const { port } = require('./src/config');

app.get('/', (req, res, next) => {
    res.status(200).send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});