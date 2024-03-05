// Express
import { server } from './server/Server';
import { Knex } from './server/database/knex';

// Dotenv
const PORT = process.env.PORT || 3000;

// Logger
import { Logger } from './server/shared/services';

const startServer = async () => {
    server.listen(PORT, () => {
        Logger.info(`Server listening on port ${PORT}`, { route: 'server', status: 'success' });
    });
};

if (process.env.IS_LOCALHOST !== 'true') {
    Logger.info('Running in production mode', { route: 'server', status: 'success' });

    Knex.migrate.latest()
        .then(() => {

            Knex.seed.run()
                .then(() => {
                    Logger.info('Database migrated and seeds ran successfully', { route: 'database', status: 'success' });
                    startServer();
                })
                .catch((e) => {
                    Logger.error('Database seed error', { route: 'database', status: 'error', message: e });
                });
        })
        .catch((e) => {
            Logger.error('Database migration error', { route: 'database', status: 'error', message: e });
        });

} else {
    Logger.info('Running in development mode', { route: 'server', status: 'success' });
    startServer();
}
