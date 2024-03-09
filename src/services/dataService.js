
const dataService = {}

dataService.createMoment = async (momentData) => {

    try {
        return await fetch(`${process.env.DATA_API_URL}/moments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(momentData),
        });

    } catch (error) {
        console.error('Error creating moment:', error.message);
        throw error;
    }
}

dataService.getAllMoments = async () => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/moments`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        return await response.json()

    } catch (error) {
        console.error('Error get moments list:', error.message);
        throw error;
    }

}

module.exports = dataService