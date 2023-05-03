import Users from "../server/models/user";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import nc from "next-connect";
import next from "next";

import { createRouter } from "next-connect";


//------------------------------- OLD -------------------------------
// export async function getServerSideProps() {
//     const res = await Users.findAll({
//         attributes: ['id', 'name', 'email', 'role']
//     });

//     // const res = await Users.findAll({ include: { all: true } })


//     const users = JSON.parse(JSON.stringify(res));

//     console.log(' Users', users);
//     return {
//         props: {
//             users: users,
//         }
//     }
// }

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


function AllUsers(props) {

    const { query } = useRouter();
    const [users, setUsers] = useState(props.users || []);

    // useEffect(() => {
    //     console.log('fetch the users');
    //     fetch(`/api/users`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setUsers(json);
    //             console.log('client users = ', json)
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

        // <div>
        //     <Link href='/'>Home</Link>
        //     {
        //         users?.map((user) => (
        //             <div>
        //                 <Link href="/user/[id]" as={`/user/${user.id}`}>User: {user.id}</Link>
        //                 <p>Name: {user.name}</p>
        //                 <p>Email: {user.email}</p>
        //                 <p>Role: {user.role}</p>
        //                 <br />
        //                 {
        //                     user.reviews?.map((review) => (
        //                         <div>
        //                             <p>Review id: {review.id}</p>
        //                             <p>Review on store id: {review.storeId}</p>
        //                             <p>Review on store name: {review.store.storeName}</p>
        //                             {/* {
        //                                 users.item?.map((item) => (
        //                                     item.stores?.map((stor) => (
        //                                         stor.id == review.storeId ? (
        //                                             <div>
        //                                                 <p>Store name: {stor.storeName}</p>
        //                                             </div>
        //                                             ) : (
        //                                                 <div>
        //                                                 </div>
        //                                             )
        //                                     )) 
        //                                 ))
        //                             } */}
        //                             <p>Review text: {review.reviewText}</p>

        //                             <br />
        //                         </div>
        //                     ))
        //                 }
        //                 {
        //                     user.stores?.map((store) => (
        //                         <div>
        //                             <br />
        //                             <p>Store id: {store.id}</p>
        //                             <p>Store name: {store.storeName}</p>
        //                             <br />
        //                             <p>Products:</p>
        //                             {
        //                                 store.products?.map((product) => (
        //                                     <p>{product.productName}</p>

        //                                 ))
        //                             }
        //                             <br />
        //                             <p>Reviews:</p>
        //                             {
        //                                 store.reviews?.map((review) => (
        //                                     <div>
        //                                         <p>id: {review.id}</p>
        //                                         <p>text: {review.reviewText}</p>
        //                                     </div>

        //                                 ))
        //                             }
        //                         </div>
        //                     ))
        //                 }
        //                 <p>----------------------------------------------------------------------</p>
        //             </div>
        //         ))
        //     }
        // </div>
    );
}

export default AllUsers;