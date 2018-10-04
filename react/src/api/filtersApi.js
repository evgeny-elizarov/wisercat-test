import client from './client';

class filtersApi {

    static get() {
        return client.get('/filters');
    };

    static save(filters) {
        return client.post('/filters', filters);
    };
}

export default filtersApi;