export const extractJsonFromText = (text) => {
    try{
        return JSON.parse(text);
    }catch (error){
        const match = text.match(/\{[\s\S]*\}/);

        if(!match){
            throw new Error("no valid JSON found in LLM response")
        }

        return JSON.parse(match[0])
    }
}