import React, { useEffect } from 'react';

export function setTitle(title) {
    useEffect(() => {
        document.title = title;
    }, []);
}