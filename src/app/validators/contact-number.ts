const contactNumberValidator = {
    pattern: {
        value: /^[0-9]{10}$/,
        message: "Please enter a valid phone number in the format xxx-xxx-xxxx"
    },
    minLength: {
        value: 10,
        message: "Please enter exactly 10 digits"
    },
    maxLength: {
        value: 10,
        message: "Please enter exactly 10 digits"
    }
}

export default contactNumberValidator;