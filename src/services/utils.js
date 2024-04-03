const utils={}

utils.dateTimeStringToDate = (dateInString)=>{
console.log('Before: ',dateInString)
    
    //chaging the timeZone to UTC-3
    let date = new Date(dateInString);

    console.log('After: ',date)
    console.log('After 2: ',date.toLocaleDateString('pt-BR',{timeZone: 'America/Sao_Paulo'}))
    return date.toLocaleDateString('pt-BR',{timeZone: 'America/Sao_Paulo'})

}

module.exports = utils
