import React from "react";
import PersonaIcon from "./PersonaIcon";
import "./Persona.scss";

export default function Persona({ title, subtitle }) {
    return (
        <div className="persona">
            <PersonaIcon title={title} />
            <div className="persona-info">
                <div className="persona-title">{title}</div>
                {subtitle && <div className="persona-subtitle">{subtitle}</div>}
            </div>
        </div>
    );
}
