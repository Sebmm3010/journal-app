import { useState } from "react";

export const useForm = (initialV = {}) => {

    const [formState, setFormState] = useState(initialV);

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        });
    }
    const onResetForm = () => {
        setFormState(initialV);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}