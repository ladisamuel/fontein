
const separateTexts = (payload: string) => {
    const text = payload.replace('_', ' ')
    const c = text?.split(" ").map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return c
}

export {
    separateTexts,
}