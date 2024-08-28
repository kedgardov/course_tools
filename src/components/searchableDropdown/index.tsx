'use client'
import { useState, useEffect } from 'react';

const Options =<T extends object>({
        pool,
        search,
        valueField,
        idField,
        className,
        handleSelect,
    }:{
        pool: T[],
        search:string,
        valueField: keyof T,
        idField: keyof T,
        className:string,
        handleSelect: any,
    }) => {
    const [options, setOptions] = useState<T[]>([]);

    useEffect(()=>{
        setOptions(pool.filter((element) => {
            const elementValue = element[valueField];
            return typeof elementValue === 'string' && elementValue.includes(search);
        }));
    }, [pool, search, valueField]);

    return (
        <div className={`${className} flex flex-col`}>
            {options.map((option:T) => {
                const idValue = option[idField];
                const optionValue = option[valueField];
                return (
                    <div
                        key={idValue+''}
                        onClick={()=>handleSelect(option)}
                        className='px-1 text-left hover:bg-gray-300'
                    >
                        {optionValue+''}
                    </div>
                );
            })}
        </div>
    );
};

export default Options;
