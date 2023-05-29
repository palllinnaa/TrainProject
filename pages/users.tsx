import React, { useEffect, useState } from 'react';
import container from "../server/container";
import Link from "next/link";

export function getServerSideProps(context) {
    return container.resolve("UserController").run(context);
}

export default function AllUsers(props) {
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                data?.map((user) => (
                    <div>
                        <Link href={`/user/${user.id}`}>User: {user.id}</Link>
                        <p>Name: {user.firstName}</p>
                        <p>Surname: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}