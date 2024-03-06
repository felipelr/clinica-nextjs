export class CalendarHelper {
    static WEEK = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
    static MONTH = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    static formatEnUS(format: Intl.DateTimeFormat, date: Date) {
        const { year, month, day } = format.formatToParts(date).reduce((acc: any, part: any) => {
            acc[part.type] = part.value
            return acc;
        }, {})
        return `${year}-${month}-${day}`
    }

    static formatUTC(format: Intl.DateTimeFormat, date: Date) {
        const { year, month, day, hour, minute } = format.formatToParts(date).reduce((acc: any, part: any) => {
            acc[part.type] = part.value
            return acc;
        }, {})
        return `${year}-${month}-${day}T${hour}:${minute}`
    }

    //en-US
    static getDateFormat(locale: string = 'pt-BR') {
        return new Intl.DateTimeFormat(locale)
    }

    static getTimeFormat(locale: string = 'pt-BR') {
        return new Intl.DateTimeFormat(locale, {
            hour: '2-digit', // exibe a hora com dois dígitos
            minute: '2-digit', // exibe os minutos com dois dígitos
            hour12: false // usa o formato de 24 horas
        })
    }

    static getDateTimeFormat(locale: string = 'pt-BR') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric', // exibe o ano com quatro dígitos
            month: '2-digit', // exibe o mês com dois dígitos
            day: '2-digit', // exibe o dia com dois dígitos
            hour: '2-digit', // exibe a hora com dois dígitos
            minute: '2-digit', // exibe os minutos com dois dígitos
            hour12: false, // define o fuso horário para UTC
        })
    }

    static getToday() {
        const value = new Date()
        return new Date(value.getFullYear(), value.getMonth(), value.getDate())
    }
}