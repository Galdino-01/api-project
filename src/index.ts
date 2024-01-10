// Express
import { server } from './server/Server';
import { Knex } from './server/database/knex';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Running in production mode');
    
    Knex.migrate.latest()
        .then(() => {

            Knex.seed.run()
                .then(() => {
                    console.log('Database migrated');
                    startServer();
                })
                .catch(console.log);
        })
        .catch(console.log);

} else {
    console.log('Running in development mode');
    startServer();
}
