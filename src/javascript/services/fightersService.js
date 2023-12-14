import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            const endpoint = `details/fighter/${id}.json`;
            const fighterDetails = await callApi(endpoint);
            return fighterDetails;
        } catch (error) {
            throw error;
        }
    }    
}

const fighterService = new FighterService();

export default fighterService;
