import {useState, useEffect} from 'react';

function useLocalStorage(key, initialValue) {
    const getSavedValue = () => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error('JSON 解析错误', e);
            }
        }
        return initialValue;
    };
const [value, setValue] = useState(getSavedValue);

// 每当value 改变时，保存到localStorage

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue]
};

export default useLocalStorage;