
import moment from 'moment'; 

const separateTexts = (payload: string) => {
    const text = payload.replace('_', ' ')
    const c = text?.split(" ").map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return c
}

const formatDate = (dateString: string) => {
    return moment(dateString).format('MMM DD, YYYY');
}

export {
    separateTexts,
    formatDate,
}