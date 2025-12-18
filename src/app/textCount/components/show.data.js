import React, { useState, useMemo, memo } from 'react';
export const ShowDataComponent = memo(({data}) => {
    console.log("Showing data:", JSON.stringify(data));
    return (
        <div>
            <p>Child Component</p>
            <span>DATA: {JSON.stringify(data)}</span>
        </div>
    );
});