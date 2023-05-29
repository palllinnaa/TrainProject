import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';
import Link from 'next/link';

export function getServerSideProps(context) {
    return container.resolve("UserController").run({ ...context, routeName: "/user/:id" });
}

export default function UserPage(props) {
    const { query } = useRouter();
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/user/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setData(json);
                })
        }
    }, [query]);
    
    return (
        <div >
            <Link href='/users'>Back to users</Link>
            <h1>User {data.id}</h1>
            <p>Name: {data.firstName}</p>
            <p>Surname: {data.lastName}</p>
            <p>Email: {data.email}</p>
            <p>Role: {data.role}</p>
        </div >
    )
}