import { UserForm } from "@/components/UserForm";
import { useUser } from "@/hooks/useUser";
import type { formInput } from "@/types";
import { useNavigate } from "react-router";

export default function AddUserPage() {
    const { addUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (values: formInput) => {
        await addUser(values);
        navigate('/users');
    }

    return (
        <section className="page">
            <div className="page-header">
                <h1>Add user</h1>
            </div>
            <UserForm
                onSubmit={handleSubmit}
                onCancel={() => navigate('/users')}
            />
        </section>
    )
}
