import { useParams, useNavigate } from "react-router";
import { useState } from "react";

export default function Show({people, updatePeople, deletePeople}) {

    const { id } = useParams();
    const person = people.find(person => person._id === id);
    const navigate = useNavigate();

    const [editForm, setEditForm] = useState(person);

    const handleChange = evt => {
        setEditForm({
            ...editForm,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        updatePeople(editForm, id);
        navigate('/');
    };

    const removePerson = () => {
        deletePeople(id);
        navigate('/');
    }


    return (
        <div className="person">
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} />
            <button id="DELETE" onClick={removePerson}>
                Delete Person
            </button>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name"
                    placeholder="name"
                    value={editForm.name}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="image"
                    placeholder="image"
                    value={editForm.image}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="title"
                    placeholder="title"
                    value={editForm.title}
                    onChange={handleChange}
                />
                <button type="submit">Edit Person</button>
            </form>
        </div>
    )
}