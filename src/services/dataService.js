
const dataService = {}

dataService.createSeal = async (user_token,sealData) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/seals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            },
            body: JSON.stringify(sealData),
        });
        return await response.json()

    } catch (error) {
        console.error('Error creating seal:', error.message);
        throw error;
    }
}

dataService.deleteSeal = async (user_token,sealId)=>{
    try {
        const deletedSeal = await fetch(`${process.env.DATA_API_URL}/seals?sealId=${sealId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        if(!deletedSeal.ok)
            console.error('Error deleting seal:',deletedSeal)

        return deletedSeal;

    } catch (error) {
        console.error('Error deleting seal:', error.message);
        throw error;
    }
}

dataService.newUser = async (user) =>{

    try {
        const response= await fetch(`${process.env.DATA_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if(response.ok)
            return await response.json();
        
    } catch (error) {
        console.error('Error registering user:', error.message);
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

        if(response.ok)
            return await response.json();
        
    } catch (error) {
        console.error('Error Login seal:', error.message);
    }
}

dataService.getAllSeals = async (user_token) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/seals`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const responseBody = await response.json();
        
        if(!response.ok)
            return console.error('Failed to fetch seals',responseBody)

        return responseBody

    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }

}




module.exports = dataService