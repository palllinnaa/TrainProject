import { startOfSecond } from "date-fns/esm";
import { StarIcon, StarIconGray } from "../src/icons";
import { ICardData } from "../src/interfaces";

interface IStarBoxProps {
    rating: number;
} 

export default function StarBox(props: IStarBoxProps) {
    const { rating } = props;
     let stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<div className='pl-0.5'><StarIcon /></div>)
    }
    for (let i = 0; i < 5-rating; i++) {
        stars.push(<div className='pl-0.5'><StarIconGray /></div>)
    }
    
    return (
        <div className="flex">
            {
                stars.map((star) => star)
            }
        </div>
    )

}