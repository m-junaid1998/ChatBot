import { useState } from 'react';

const useErrorHandlingHook = (data = {}, validationSchema = {}) => {
    const [apiData, setApiData] = useState(data);

    const validateField = (key, value) => {
        const rules = validationSchema[key];
        if (!rules) {
            return '';
        }

        for (const rule of rules) {
            const result = rule(value);
            if (result !== true) {
                return result;
            }
        }
        return '';
    };

    const setterForApiData = (key, value) => {
        const errorMsg = validateField(key, value);

        setApiData(prev => ({
            ...prev,
            [key]: value,
            [`error_${key}`]: errorMsg,
        }));
    };

    const resetStates = () => {
        let temp = { ...apiData };
        for (let keys in temp) {
            if (keys?.startsWith('error_')) {
                delete temp[keys];
            } else {
                temp[keys] = '';
            }
        }
        setApiData(temp);
    };

    const checkForError = () => {
        let isAllowedForProceeding = true;
        const temp = { ...apiData };

        for (let key in validationSchema) {
            const value = apiData[key];
            const errorMsg = validateField(key, value);

            if (errorMsg) {
                temp[`error_${key}`] = errorMsg;
                isAllowedForProceeding = false;
            }
        }

        setApiData(temp);
        return isAllowedForProceeding;
    };

    return {
        apiData,
        setterForApiData,
        checkForError,
        resetStates,
    };
};

export default useErrorHandlingHook;