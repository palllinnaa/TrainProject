import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    res.status(200).json({text: 'Hello'});
}




/*type Data = {
    text:string
}

export default function handler(
    req:NextApiRequest, 
    res:NextApiResponse<Data>
    ) {
    res.status(200).json({text: 'Hello'});
}*/