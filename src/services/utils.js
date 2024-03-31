const utils={}

utils.dateTimeStringToDate = (dateInString)=>{

    
    //chaging the timeZone to UTC-3
    let date = new Date(dateInString);
    return date.toLocaleDateString('pt-BR',{timeZone: 'America/Sao_Paulo'})

}

module.exports = utils