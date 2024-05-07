
const dataService:any = {}

dataService.createSeal = async (user_token:string, sealData:{}) => {

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

dataService.deleteSeal = async (user_token:string, sealId:string) => {
    try {
        const deletedSeal = await fetch(`${process.env.DATA_API_URL}/seals?sealId=${sealId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        if (!deletedSeal.ok)
            console.error('Error deleting seal:', deletedSeal)

        return deletedSeal;

    } catch (error) {
        console.error('Error deleting seal:', error.message);
        throw error;
    }
}

export interface UserPreRegister {
    user_name:string,
    user_psw:string
}

dataService.newUser = async (user:UserPreRegister) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok)
            return await response.json();

    } catch (error) {
        console.error('Error registering user:', error.message);
    }
}

dataService.login = async (user:UserPreRegister) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok)
            return await response.json();

    } catch (error) {
        console.error('Error Login seal:', error.message);
    }
}

dataService.createSealTemplate = async (templates:any[])=>{

    try {
        templates.forEach(async (template:{})=>{

            await fetch(`${process.env.DATA_API_URL}/seal-template`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body:JSON.stringify(template)
            })

        });

    }catch(err){
        console.error(err)
    }
}

dataService.getAllSealTemplates = async () => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/seal-template`)

        const responseBody = await response.json();

        if (!response.ok)
            return console.error('Failed to fetch seals template', responseBody);

        const sealTemplates = responseBody.map((sealTemplate:any)=>{
            sealTemplate.seal_hashtags = sealTemplate.seal_hashtags.map((hashtag:string)=>{return '#'+hashtag}).concat(' ')
            return sealTemplate
        })

        return sealTemplates

    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }
}

                                                    //must have at least the attribute _id
dataService.updateSeal = async (user_token:string, sealData:{_id: string;[key: string]: any}) => {
    try {

        const response = await fetch(`${process.env.DATA_API_URL}/seals/${sealData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            },
            body: JSON.stringify(sealData),
        });
        const responseBody = await response.json();

        return responseBody

    } catch (error) {
        console.error('Error updating seal:', error.message);
        throw error;
    }
}


dataService.getOcean = async (user_token:string) => {

    try {

        const response = await fetch(`${process.env.DATA_API_URL}/seals/open-ocean`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const responseBody = await response.json();

        if (!response.ok)
            return console.error('Failed to fetch ocean',responseBody)

        return responseBody

    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }

}

dataService.getSealById = async (seal_id:string,user_token:string) =>{

    try {

        const response = await fetch(`${process.env.DATA_API_URL}/seals/${seal_id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        const seal =  await response.json();

        if(!seal)
            return console.error('Failed to fetch seasl', seal);

        return seal;

    } catch (error) {
        console.error('Error get seal:', error);
        throw error;
    }
}

dataService.getAllSeals = async (user_token:string) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/seals`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });
        const responseBody = await response.json();

        if (!response.ok)
            return console.error('Failed to fetch seals', responseBody)

        return responseBody

    } catch (error) {
        console.error('Error get seals list:', error);
        throw error;
    }

}

dataService.getUser = async (user_token:string,user_id:string) => {

    try {
        const response = await fetch(`${process.env.DATA_API_URL}/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`
            }
        });

        if (response.ok)
            return await response.json();

        console.error('Error getting user:', response);

    } catch (error) {
        console.error('Error getting user:', error.message);
    }
}


export default dataService