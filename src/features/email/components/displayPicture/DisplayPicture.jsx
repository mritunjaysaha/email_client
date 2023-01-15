import React from "react";

export function DisplayPicture({ name }) {
    return (
        <div className="email_display_picture">
            <div className="email_display_name">{name[0]}</div>
        </div>
    );
}
