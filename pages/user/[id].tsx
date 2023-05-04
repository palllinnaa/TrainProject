import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Users from '../../server/models/user';
import { createRouter } from "next-connect";

const router = createRouter()
    .get("user/:id", async (req: any) => {
        const id = req.params.id;
        const result = await Users.findByPk(id)

        const user = JSON.parse(JSON.stringify(result));

        return { props: { user } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function UserPage(props) {
    const { query } = useRouter();
    const [user, setUser] = useState(props.user || []);
    useEffect(() => {
        fetch(`/api/user/` + query.id)
            .then(res => res.json())
            .then(json => {
                setUser(json);
            })
    }, []);

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