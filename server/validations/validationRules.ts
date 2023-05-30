const validationRules = {
    user: {
        firstName: {
            type: 'string',
            minLength: 3,
            pattern: '[A-Za-z]'
        },
        lastName: {
            type: 'string',
            minLength: 3,
            pattern: '[A-Za-z]'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            format: 'password',
            minLength: 4
        },
        role: {
            type: 'string',
            enum: ["user", "seller"]
        }
    }
};

export default validationRules;