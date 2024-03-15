import * as fs from "fs";

function printError(text){
    console.error('\x1b[31m%s\x1b[0m', `Error: ${text}`);
}

function readJSONFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(fileData);

        return jsonData;
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error(`File '${filePath}' not found.`);
        } else {
            console.error(`Error reading JSON from file '${filePath}': ${error.message}`);
        }
        return null;
    }
}

function extractStringsWithinQuotes(jsonData){
    const resultSet = new Set();
    
    const regex = /"(.*?)"/g;

    let match;
    while ((match = regex.exec(JSON.stringify(jsonData))) !== null) {
        resultSet.add(match[1]);
    }
    return resultSet;
}

function getSetFromExtracted(){
    const filePath = "./src/translations/locale-app.json";
    const jsonData = readJSONFile(filePath);
    return extractStringsWithinQuotes(jsonData)
}

function getMapFromJson(jsonData){
    const map = new Map();
    const regex = /"(.*?)"/g;
    const stringify = JSON.stringify(jsonData)
    const regexSplit = /(?<="),/g;
    const splittedArray = stringify.split(regexSplit);
    splittedArray.forEach(line => {
       let match, res = [];
        while ((match = regex.exec(line)) !== null) {
            res.push(match[1])
        }
        map.set(res[0],res[1])
    })
    return map
}

function getSetFromEn(){
    const filePath = "./src/translations/en.json";
    const jsonData = readJSONFile(filePath);
    return getMapFromJson(jsonData)
}
function getSetFromUk(){
    const filePath = "./src/translations/uk.json";
    const jsonData = readJSONFile(filePath);
    return getMapFromJson(jsonData)
}

function comparator(appSet,en,uk){
    let errorCounter = 0;
    if(appSet.size > en.size){
        printError(`English file missing ${appSet.size - en.size} translations`)
        errorCounter += equalityCheck(appSet, en, "en.json");
    }
    if(appSet.size > uk.size){
        printError(`Ukrainian file missing ${appSet.size - uk.size} translations`)
        errorCounter += equalityCheck(appSet, uk, "uk.json");
    }
    if(appSet.size < en.size){
        printError(`english file has more ${en.size - appSet.size } translations`)
        errorCounter += equalityMapCheck(en, appSet, "locale-app.json");
    }
    if(appSet.size < uk.size){
        printError(`ukrainian file has more ${uk.size - appSet.size } translations`)
        errorCounter += equalityMapCheck(uk, appSet, "locale-app.json");
    }
    if(appSet.size == en.size && en.size == uk.size){
        errorCounter += equalityCheck(appSet, en, "en.json");
        errorCounter += equalityCheck(appSet, uk, "uk.json");
    }
    
    if (errorCounter == 1) {
        throw new Error(`Detected ${errorCounter} error`);
    } else if (errorCounter > 1) {
        throw new Error(`Detected ${errorCounter} errors`);
    } 
    console.log("No errors detected.");
    
}

function equalityCheck(set, map, name){
    let errorCounter = 0;
    set.forEach(setEl => {
        if(!map.has(setEl)){
            printError(`Could find '${setEl}' in ${name}`)
            errorCounter++;
        }
        else if (map.get(setEl).length === 0){
            printError(`Key '${setEl}' in ${name} has length 0`)
            errorCounter++;
        }
    })
    return errorCounter;
}

function equalityMapCheck(map, set, name){
    let errorCounter = 0;
    map.forEach((_,key) => {
        if(!set.has(key)){
            printError(`Could find '${key}' in ${name}`)
            errorCounter++;
        }
    })
    return errorCounter;
}


function main(){
    const extractedSet = getSetFromExtracted();
    const localeEnMap = getSetFromEn();
    const localeUkMap = getSetFromUk();

    try{
        comparator(extractedSet,localeEnMap,localeUkMap)
    } catch(e){
        printError(e.message)
    }
}

main();