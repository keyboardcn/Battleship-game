import React, { useState, useMemo, memo } from 'react';

export type MemoizedValueType = {
        length: number;
        content: string;
}

export const ShowDataComponent = memo<MemoizedValueType>((data) => {
    console.log("Showing data:", JSON.stringify(data));
    return (
        <div>
            <p>Child Component</p>
            <span>DATA: {JSON.stringify(data)}</span>
        </div>
    );
});