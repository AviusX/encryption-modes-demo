import express from 'express';
import encryptRoutes from './routes/encrypt';
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? 9000;

app.use(cors());
app.use('/encrypt', encryptRoutes);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
