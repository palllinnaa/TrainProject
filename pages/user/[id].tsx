import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Users from '../../server/models/user';
import nc from "next-connect";


export async function getServerSideProps({ query }) {
    const id = query.id;
    const res = await Users.findByPk(id)
    let user = JSON.parse(JSON.stringify(res));

    console.log('SSR, user = ', user)
    return {
        props: {
            user,
        }
    }
}

// export async function getServerSideProps({req, res, params}) {
//     const handler = nc()
//         .get(async (req, res, next) => {
//             const id = params.id;
//             const result = await Users.findByPk(id)
//             const user = JSON.parse(JSON.stringify(result));
//             return {
//                 props: { user }
//             }
//         })
//     try {
//         await handler.run(req, res);
//     } catch (e) {

//     }
//     return {
//         props: { user: req.user }
//     }

// }


export default function UserPage(props) {
    const { query } = useRouter();
    const [user, setUser] = useState(props.user || []);

    console.log('props-----------------------', props);

    // useEffect(() => {
    //     console.log('fetch the user = ' + query.id);
    //     fetch(`/api/user/` + query.id)
    //         .then(res => res.json())
    //         .then(json => {
    //             setUser(json);
    //             console.log('client, user = ', json)
    //         })
    // }, []);

    return (
        <div >
            <Link href='/users'>Back to users</Link>
            <h1>User {user.id}</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div >
    )

}