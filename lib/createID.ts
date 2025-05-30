// made this to just create the ids for each speech

export const createSpeechID = (id : number) => {

    return id.toString().padStart(4, '0');

}