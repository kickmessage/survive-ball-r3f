import { Line } from "@react-three/drei";
import { useGameStore } from "../state/";
import { useEffect, useState } from "react";
import { StateType } from "../types"


export default function Streak() {

    const currentBallPosition = (useGameStore((state:StateType) => state.currentBallPosition));
    const [c, setC] = useState<[number,number,number]>(currentBallPosition ? currentBallPosition : [0,0,0]);
    const [index, setIndex] = useState(0);
    const isBallClicked = useGameStore((state:StateType) => state.isBallClicked)
    const MAX_POINTS = 10;
    let dummyArray: [number,number,number][] = []
    for (let i = 0; i < MAX_POINTS; i++) {
        dummyArray.push([0,0,0])

    }
    const [points,setPoints] = useState(dummyArray);

    useEffect(()=> {
        if (index === MAX_POINTS) {
            setIndex(0);
            if (currentBallPosition) setC(currentBallPosition);
            let p:[number,number,number][] = points;
            p[0] = c;
            setPoints(p);
        }
        else {
            if (currentBallPosition) setC(currentBallPosition);
            let p = points;
            p[index] = c;
            setPoints(p);
            setIndex(index + 1)

        }


    }, [currentBallPosition])


    //points prop inside Line component doesn't work if the points array was fed directly i.e. ` points={points}`
    //even though `x` and `points` are exactly the same...
    //zero clue why this is the case
    let points2 = [];
    for (let i =0; i < points.length; i++) {
        points2.push(points[i])


    }

    //further proof something really weird is going on...
    /*
       console.log(points[0] === points2[0]) //true
       console.log(points[1] === points2[1]) //true
       console.log(points[2] === points2[2]) //true
       console.log(points[3] === points2[3]) //true
       console.log(points[4] === points2[4]) //true 
       console.log(points[5] === points2[5]) //true
       console.log(points[6] === points2[6]) //true 
       console.log(points[7] === points2[7]) //true 
       console.log(points[8] === points2[8]) //true 
       console.log(points[9] === points2[9]) //true
       console.log(points[10]) //undefined
       console.log(points2[10]) //undefined
       console.log(points.length === points2.length) //true
       console.log(points === points2) //false ????????????????????????????

     */








    return(
        <mesh name='streak' visible={isBallClicked}>
            <Line
                color="white"
                lineWidth={10}
                points={points2}
            />

        </mesh>


    )



} 
