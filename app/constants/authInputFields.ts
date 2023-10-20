import InputFieldsProps from "@/app/interfaces/props/InputFieldsProps";

const AuthInputFields = [
    { id: 'email', label: 'Email address', type: 'email' },
    { id: 'password', label: 'Create a password', type: 'password', showOnRegister: true },
    { id: 'confirmPassword', label: 'Password', type: 'password' }
];

export default AuthInputFields;
