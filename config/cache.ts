import { defineConfig, store, drivers } from '@adonisjs/cache';

const cacheConfig = defineConfig({
    default: 'default',

    stores: {
        memoryOnly: store().useL1Layer(drivers.memory()),

        /**
         * The bus propagates invalidations to the L1 memory layer of every process
         * (HTTP server, Ace commands, seeders), so a cache delete done outside the
         * server is not shadowed by its in-memory copy.
         */
        default: store()
            .useL1Layer(drivers.memory())

            .useL2Layer(
                drivers.redis({
                    connectionName: 'main',
                })
            )

            .useBus(
                drivers.redisBus({
                    connectionName: 'main',
                })
            ),
    },
});

export default cacheConfig;

declare module '@adonisjs/cache/types' {
    interface CacheStores extends InferStores<typeof cacheConfig> {}
}
