import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { createRouter } from "next-connect";
import container from "../server/container";

const userController = container.resolve("UserController");
const router = createRouter()
    .get(userController.findAllUsersServerSideProps)

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function AllUsers(props) {
    const { query } = useRouter();
    const [users, setUsers] = useState(props.users || []);
    useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(json => {
                setUsers(json);
            })
    }, [query]);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                users?.map((user) => (
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