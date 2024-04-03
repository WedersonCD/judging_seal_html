const utils={}

utils.dateTimeStringToDate = (dateInString)=>{
    
    //chaging the timeZone to UTC-3
    let date = new Date(dateInString);

    return date.toLocaleDateString('pt-BR',{timeZone: 'America/Sao_Paulo'})

}

utils.getShareableText = (seal) =>{
    
    let stars = ''

    for(x=1;x<=5;x++){

        stars = stars + ((x <= seal.seal_rate) ? '⭐' : '☆');

    }

    const sharableText = `
*${seal.seal_name.replace(/'/g, '')}* - ${seal.seal_updatedAt.substring(0,10)}

${seal.seal_description.replace(/'/g, '')}

${stars}

You can judge to in:
https://judgingseal.com.br/ (do not forget your account)
`;

    return sharableText

}

module.exports = utils
