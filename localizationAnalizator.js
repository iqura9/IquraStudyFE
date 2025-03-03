import * as fs from "fs";

function printError(text) {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${text}`);
}

function readJSONFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error(`File '${filePath}' not found.`);
        } else {
            console.error(`Error reading JSON from file '${filePath}': ${error.message}`);
        }
        return null;
    }
}

function getMapFromJson(jsonData) {
    const map = new Map();
    Object.entries(jsonData).forEach(([key, value]) => {
        map.set(key, value);
    });
    return map;
}

function getTranslations(filePath) {
    const jsonData = readJSONFile(filePath);
    return jsonData ? getMapFromJson(jsonData) : new Map();
}

function comparator(appSet, en, uk) {
    let errorCounter = 0;
    let missingInUk = [];

    appSet.forEach((key) => {
        if (!en.has(key)) {
            printError(`English file is missing key: "${key}"`);
            errorCounter++;
        }
        if (!uk.has(key)) {
            missingInUk.push(`"${key}": "${en.get(key)}"`);
            errorCounter++;
        }
    });

    if (missingInUk.length > 0) {
        console.error(`\nUkrainian file missing ${missingInUk.length} keys:`);
        console.error(missingInUk.join("\n"));
    }

    if (errorCounter === 1) {
        throw new Error(`Detected ${errorCounter} error`);
    } else if (errorCounter > 1) {
        throw new Error(`Detected ${errorCounter} errors`);
    }
    console.log("No errors detected.");
}

function main() {
    const appSet = new Set(getTranslations("./src/translations/locale-app.json").keys());
    const enMap = getTranslations("./src/translations/en.json");
    const ukMap = getTranslations("./src/translations/uk.json");

    try {
        comparator(appSet, enMap, ukMap);
    } catch (e) {
        printError(e.message);
    }
}

main();