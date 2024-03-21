import React from 'react';

type Props = {
    text: string | undefined;
};

const ErrorText: React.FC<Props> = ({ text }) => {
    return (
        <p className='absolute text-xs text-red-700 right-0 py-1'>{text ? text : ""}</p>
    );
};

export default ErrorText;
