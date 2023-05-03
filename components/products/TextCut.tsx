export default function TextCut(props) {
    let { text } = props;
    const limit = 90;
    var dots = "...";
    if (text.length > limit) {
        text = text.substring(0, limit) + dots;
    }

    return (
        <span className="mt-3 overflow-hidden text-sm text-gray-400 text-clip ">{text}</span>
    )
}
