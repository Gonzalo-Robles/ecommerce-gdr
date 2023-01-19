import { Oval } from "react-loader-spinner"
const Loading = () => {
    return(
    <Oval
     ariaLabel="loading-indicator"
    height={80}
    width={80}
    strokeWidth={5}
    strokeWidthSecondary={1}
    color="blue"
    secondaryColor="white"
    />
    )

}
export default Loading