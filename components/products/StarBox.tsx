interface IStarBoxProps {
    rating: number;
}

export default function StarBox(props: IStarBoxProps) {
    const { rating } = props;
    let stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<div className='pl-0.5'>
            <img className="w-3 h-3" src="../images/full_star_icon.png" alt="full star icon" />
        </div>)
    }
    for (let i = 0; i < 5 - rating; i++) {
        stars.push(<div className='pl-0.5'>
            <img className="w-3 h-3" src="../images/star_icon.png" alt="star icon" />
        </div>)
    }

    return (
        <div className="flex">
            {
                stars.map((star) => star)
            }
        </div>
    )
}