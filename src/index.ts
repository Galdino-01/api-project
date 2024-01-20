// Express
import { server } from './server/Server';
import { Knex } from './server/database/knex';

// Dotenv
const PORT = process.env.PORT || 3000;

// Logger
import { Logger } from './server/shared/services';

const startServer = async () => {
    server.listen(PORT, () => {
        Logger.info(`Server listening on port ${PORT}`, { route: 'server', status: 'success', params: {} });
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    Logger.info('Running in production mode', { route: 'server', status: 'success', params: {} });

    Knex.migrate.latest()
        .then(() => {

            Knex.seed.run()
                .then(() => {
                    Logger.info('Database migrated', { route: 'database', status: 'success', params: {} });
                    startServer();
                })
                .catch(Logger.error);
        })
        .catch(Logger.error);

} else {
    Logger.info('Running in development mode', { route: 'server', status: 'success', params: {} });
    startServer();
}
