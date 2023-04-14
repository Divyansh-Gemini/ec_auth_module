import express from 'express';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRouter.js';

const app = express();
const port = process.env.PORT || 3232;

app.use(express.json());

app.use((req, res, next) => {
    console.log("\n_______________________________________");
    console.log(`\nHTTP Method: ${req.method} | URL: ${req.url}`);
    next();
});

app.use('/user', userRouter);
app.use('/seller', sellerRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!!');
});

app.listen(port, () => {
    console.log(`\nApp is listening on port ${port}`);
});