import React from 'react';

type Props = {
    text: string | undefined;
};

const ErrorText: React.FC<Props> = ({ text }) => {
    return (
        <p className='text-xs text-red-700 pt-2'>{text ? text : ""}</p>
    );
};

export default ErrorText;
