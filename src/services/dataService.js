
const dataService = {}

dataService.createMoment = async (user_token,momentData) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/moments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            },
            body: JSON.stringify(momentData),
        });
        return await response.json()

    } catch (error) {
        console.error('Error creating moment:', error.message);
        throw error;
    }
}

dataService.login = async (user) =>{

    try {
        const response= await fetch(`${process.env.DATA_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        return await response.json()

    } catch (error) {
        console.error('Error creating moment:', error.message);
        throw error;
    }
}

dataService.getAllMoments = async (user_token) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/moments`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const responseBody = await response.json();
        
        if(!response.ok)
            return console.error('Failed to fetch moments',responseBody)

        return responseBody

    } catch (error) {
        console.error('Error get moments list:', error);
        throw error;
    }

}

module.exports = dataService