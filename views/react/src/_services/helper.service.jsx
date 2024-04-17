const toBase64 = file => new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);

});

const getUpdateKey = (jsData, keys) => {
    for (const ky in keys) {
        if (jsData.hasOwnProperty(ky)) {
            jsData[keys[ky]] = jsData[ky];
            delete jsData[ky];
        }
    }
    return jsData;
};

const getJsonForm = (jsData) => {
    const fData = new FormData();
    for (const jd in jsData) {
        if (jsData[jd] instanceof FileList) {
            fData.append(jd, jsData[jd][0]);
        } else if (jsData[jd] instanceof Array) {
            jsData[jd].forEach((val, index) => {
                if (val instanceof Object) {
                    for (const jddd in jsData[jd][index]) {
                        fData.append(`${jd}[${index}][${jddd}]`, jsData[jd][index][jddd]);
                    }
                } else {
                    fData.append(`${jd}[${index}]`, jsData[jd][index]);
                }
            });
        } else {
            fData.append(jd, jsData[jd]);
        }
    }
    return fData;
}

const getJsonForms = (jsData) => {
    const fData = new FormData();
    for (const jd in jsData) {
        if (jsData[jd] instanceof FileList) {
            for (const jdd in jsData[jd]) {
                if (!isNaN(jdd)) {
                    fData.append(jd + "[]", jsData[jd][jdd]);
                }
            }
        } else {
            fData.append(jd, jsData[jd]);
        }
    }
    return fData;
}


export {
    toBase64,
    getJsonForm,
    getJsonForms,
    getUpdateKey
}