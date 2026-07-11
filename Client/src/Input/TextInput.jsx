'use client';
import { ReactNode } from "react";
import { Label } from "./inputUtils";


export function TextInput({ style,className, index, onChange, name, value, label }){


    return (
        <div className={className} style={style}>
            {label && (<Label name={label} />)}
            <input
            style={style}
                type="text"
                name={name}
                id={name}
                value={index !== undefined ? value[name][index] : value[name]|| ""}
                onChange={e => onChange(name, e.target.value, index)}
                className="border" />
        </div>
    )
}
