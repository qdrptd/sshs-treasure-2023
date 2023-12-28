import { Image } from "semantic-ui-react";
export default function NotFound(){
    const src = process.env.PUBLIC_URL + '/404.png';
    return(
        <Image src={src}></Image>
    )
}