import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { createRouter } from "next-connect";
import container from '../../server/container';

const userController = container.resolve("UserController");
const router = createRouter()
    .get(userController.findUserByIdServerSideProps);

export async function getServerSideProps(context) {
    return router.run({ ...context.req, params: context.params }, context.res);
}

export default function UserPage(props) {
    const { query } = useRouter();
    const [user, setUser] = useState(props.user || []);
    
    useEffect(() => {
        if (query?.id) {
            fetch(`/api/user/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setUser(json);
                })
        }
    }, [query]);

    return (
        <div >
            <Link href='/users'>Back to users</Link>
            <h1>User {user.id}</h1>
            <p>Name: {user.firstName}</p>
            <p>Surname: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div >
    )
}