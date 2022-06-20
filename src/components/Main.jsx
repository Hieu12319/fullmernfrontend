import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";

export default function Main(props) {
    const [people, setPeople]=useState(null);

    const URL = "http://localhost:3001/people/";

    const getPeople = async () => {
        const data = await fetch (URL).then(res => res.json())
        // const response = await fetch(URL)
        // const data = await response.json()
        setPeople(data)
    }

    const createPeople = async (person) => {
        // make post request to create people
        await fetch (URL, {
            method: "Post",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        })
        //update list of people
        getPeople()
    }

const updatePeople = async (person, id) => {
    await fetch(URL + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
    getPeople();
};

const deletePeople = async id=> {
    await fetch(URL + id, {method: 'DELETE'});
    getPeople();
}

    useEffect(() => {getPeople()}, [])

    return (
        <main>
            <Routes>
                <Route exact path="/" element={<Index  people={people} createPeople={createPeople}/>} />
                <Route path="/people/:id" element={
                <Show
                 people={people}
                 deletePeople={deletePeople}
                 updatePeople={updatePeople} />
                }/>
            </Routes>
        </main>
    )
}