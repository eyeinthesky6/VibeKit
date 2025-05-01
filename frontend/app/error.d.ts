import React from 'react';
interface ErrorProps {
    error: Error;
    reset: () => void;
}
export default function RootError({ error, reset }: ErrorProps): React.JSX.Element;
export {};
