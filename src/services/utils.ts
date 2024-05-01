import { Seal } from "../types";


const utils:any = {}

utils.dateTimeStringToDate = (dateInString:string):string => {

    //chaging the timeZone to UTC-3
    let date = new Date(dateInString);

    return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })

}

utils.getShareableText = (seal:Seal):string => {
    
    let stars = ''

    for (let x = 1; x <= 5; x++) {

        stars = stars + ((x <= seal.seal_rate) ? '⭐' : '☆');

    }

    const sharableText = `
*${seal.seal_name.replace(/'/g, '')}* - ${seal.seal_updatedAt.substring(0, 10)}

${seal.seal_description.replace(/'/g, '')}

${stars}

You can judge to in:
https://judgingseal.com.br/ (do not forget your account)
`;

    return sharableText

}

utils.getStarLineChartOption = (seals:Seal[]):object => {

    const dateAndRates:any = {}

    seals.forEach((seal:Seal)=>{
        if(typeof seal.date !== 'string')
            return;

        if(!dateAndRates[seal.date])
            dateAndRates[seal.date]={sum: 0, qtd: 0};

        dateAndRates[seal.date].sum+=seal.seal_rate;
        dateAndRates[seal.date].qtd+=1;

    });

    const rates:number[] = [];
    const dates:string[] = [];

    for (let date in dateAndRates){
        let dateAndRate = dateAndRates[date];
        dates.push(date);
        rates.push(dateAndRate.sum / dateAndRate.qtd)
    }


    return {
        title:{
            left: 'center',
            text: 'How you have Beeing'
        },
        xAxis: {
            type: 'category',
            data: dates,
            inverse: true
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: rates,
                type: 'line',
                smooth:true
            }
        ]
    };

}

module.exports = utils
