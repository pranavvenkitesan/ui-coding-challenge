import type { formInput } from "@/types"
import { Emptyuser } from "@/ut/utils/maping"
import { useState, type FormEvent } from "react"

type FieldKey = keyof formInput;
type FormErrors = Partial<Record<FieldKey, string>>;

const fields: { key: FieldKey; label: string; required: boolean; type: string }[] = [
    { key: 'name', label: 'Name', required: true, type: 'text' },
    { key: 'email', label: 'Email', required: true, type: 'email' },
    { key: 'city', label: 'City', required: true, type: 'text' },
    { key: 'company', label: 'Company', required: true, type: 'text' },
]


function trimValues(values: formInput): formInput {
    return {
        name: values.name.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        company: values.company.trim(),
    }
}

function validate(values: formInput): FormErrors {
    const errors: FormErrors = {};
    for (const field of fields) {
        if (field.required && !values[field.key]) {
            errors[field.key] = `${field.label} is required`;
        }
    }
    return errors;
}

type UserFormProps = {
    initialValues?: formInput
    onSubmit: (values: formInput) => Promise<void> | void
    onCancel: () => void;
}
export const UserForm = (
    {
        initialValues = Emptyuser,
        onSubmit,
        onCancel
    }: UserFormProps
) => {

    const [values, setValues] = useState<formInput>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = trimValues(values);
        const nextErrors = validate(trimmed);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSubmitError(null);
        try {
            await onSubmit(trimmed);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : String(error));
        }
    }

    return <form className="form" noValidate onSubmit={handleSubmit}>

        {fields.map(field => {
            const error = errors[field.key];
            const errorId = `${field.key}-error`;

            return <label key={field.key} className="textarea-fields fields">
                <span>{field.label} {field.required && "*"}</span>
                <input
                    name={field.key}
                    type={field.type}
                    value={values[field.key]}
                    required={field.required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onChange={(e) => {
                        const { value } = e.target;
                        setValues((prev) => ({ ...prev, [field.key]: value }));
                    }}
                />
                {error && <span id={errorId} role="alert">{error}</span>}
            </label>
        })}

        {submitError && <p role="alert">{submitError}</p>}

        <div>
            <button type="button" className="btn" onClick={onCancel}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary" >
                Save
            </button>
        </div>
    </form>

}
