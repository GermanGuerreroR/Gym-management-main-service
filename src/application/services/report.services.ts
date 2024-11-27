
import axios from 'axios'


export class Report {


    async consultTrainingActivityReport() {


        const url = "http://localhost:3002/api/v1/reports/activities"


        const response = await axios.get(url);
        return response.data
    }
}