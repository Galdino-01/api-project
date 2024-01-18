// Express
import { server } from './server/Server';
import { Knex } from './server/database/knex';

// Dotenv
const PORT = process.env.PORT || 3000;

// Logger
import logger from './server/logger';

const startServer = async () => {
    server.listen(PORT, () => {
        logger.info(`Server listening on port ${PORT}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    logger.info('Running in production mode');
    
    Knex.migrate.latest()
        .then(() => {

            Knex.seed.run()
                .then(() => {
                    logger.info('Database migrated');
                    startServer();
                })
                .catch(logger.info);
        })
        .catch(logger.info);

} else {
    logger.info('Running in development mode');
    startServer();
}
