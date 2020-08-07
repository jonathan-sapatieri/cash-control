const { port } = require('./src/config');
const app = require('./src');
const PORT = port || 4001;

app.get('/', (req, res, next) => {
    res.status(200).send('Server is running!');
});

app.listen(PORT || 4001, () => {
    console.log(`Server running on port: ${PORT}`)
});