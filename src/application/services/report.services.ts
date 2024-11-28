import axios from 'axios';
import config from 'config';

export class Report {
    async consultTrainingActivityReport(month: number, year: number, id: number) {
        try {
            const urlBase = config.get<string>('REPORT_SERVICE.URL');
            const url: string = `${urlBase}/${month}/${year}/${id}`;

            // Realizar la solicitud
            const response = await axios.get(url);

            //
            const data = response.data;

           
            console.log('Generated URL:', url);
            console.log('Response Data:', data);

            return data;
        } catch (error) {
            console.error('Error in consultTrainingActivityReport:', error);
            throw error; // Lanza el error para manejarlo en capas superiores
        }
    }
}
