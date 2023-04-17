import { colors } from "../constants"

export default function useScene() {

    type Props = {
        range:number;
        limit: number;
    }
    function getSceneColor({range, limit}: Props) {
        return(  colors[(Math.abs(Math.floor(colors.length-(limit)-Math.random()*(range))))]);

    }

    return { getSceneColor }


}
