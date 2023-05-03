import Users from "../server/models/user";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { createRouter } from "next-connect";

const router = createRouter()
    .get(async (req, res) => {
        const result = await Users.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });
        const users = JSON.parse(JSON.stringify(result));
        return { props: { users } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function AllUsers(props) {
    const { query } = useRouter();
    const [users, setUsers] = useState(props.users || []);
    // useEffect(() => {
    //     fetch(`/api/users`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setUsers(json);
    //         })
    // }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                users?.map((user) => (
                    <div>
                        <Link href="/user/[id]" as={`/user/${user.id}`}>User: {user.id}</Link>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}