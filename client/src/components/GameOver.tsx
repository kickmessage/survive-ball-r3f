import { Html} from "@react-three/drei";
import { useGameStore } from "../state"
import { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useHistory } from "react-router-dom";
import { useLeaderboard } from "../hooks/"
import { StateType } from "../types"
import Leaderboard from "./Leaderboard";
import "./GameOver.css"

export default function GameOverScreen() {

    const remainingLives = useGameStore((state:StateType) => state.remainingLives);
    const currentLevel = useGameStore((state:StateType) => state.currentLevel);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasBeenSubmitted, setHasSubmitted] = useState(false);
    const { camera } = useThree();
    const history = useHistory();
    const { submitForm } = useLeaderboard();

    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

    useFrame(() => {
        if(remainingLives === 0 && isVisible === false) {
            setTimeout(()=> {
                //@dev for some reason the html doesn't render until the camera moves
                //... janky but it works
                //@TODO find cleaner solution eventually
                camera.position.x +=1;
                setIsVisible(true);


            }, 2000)
        }


    })

    useEffect(()=> {



    }, [isLeaderboardOpen])



    function handleClick(buttonAction: 'restart' | 'submit' | 'view' | 'menu' ) {
        if (buttonAction === 'restart') {
            window.location.reload();


        }
        if (buttonAction === 'submit') {

            setIsSubmit(true);

        }
        if (buttonAction === 'view') {
            setIsLeaderboardOpen(true)



        }
        if(buttonAction === "menu") {
            history.push('/splash')




        }



    }

    function onSubmit(e:any) {
        e.preventDefault();

        const username = e.target.elements.username.value;
        if (!hasBeenSubmitted) handleSubmit({username: username, score: currentLevel});
        setHasSubmitted(true);

    }
    type SubmitProps = {
        username: string;
        score: number
    }
    async function handleSubmit({username, score}: SubmitProps) {
        if (score !== null) {
            await   submitForm({
                username: username,
                score: score.toString()
            })


        }
        else window.alert('cannot submit record with a score of zero!')

    }

    function handleSubmitConfirm() {
        if (!isSubmitted) {
            setIsSubmitted(true);
            setTimeout(()=> {
                setIsSubmitted(false);


            }, 3000);


        }


    }


    return(

        <Html
            center 
            occlude={!isVisible}
        >
            <>
                <div className="game-over-menu">

                    <h1>GAME OVER!</h1>
                    <div className="menu-score-result">
                        Level reached: {currentLevel}


                    </div>
                    <div className="game-over-menu-buttons-container">

                        <button
                            onClick={(e) => {handleClick('restart')}}                               
                        >
                            Play Again 
                        </button>
                        {
                            (!isSubmit) ?
                                (
                                    <button onClick={(e) => {handleClick('submit')}}>
                                        Submit to Leaderboard
                                    </button>
                            ) 
                            :
                                (
                                    <form onSubmit={e => (onSubmit(e))}
                                        className="username-result-form"
                                    >
                                        <input 
                                            className="username-input"
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            required/>
                                        <button
                                            type="submit"
                                            onClick={e => handleSubmitConfirm()}
                                        >Submit
                                        </button>
                                        {
                                            (isSubmitted) ? 
                                                (<span className="submit-confirm-text">Record Submitted!</span>)
                                                :
                                                    <span></span>

                                        }

                                    </form>
                            )
                        }
                        <button
                            onClick={(e) => {handleClick('view')}}                               
                        >
                            View Leaderboard
                        </button>
                        <button
                            onClick={(e) => {handleClick('menu')}}                               
                        >
                            Main Menu 
                        </button>


                    </div>
                </div>
                <div className="leaderboard-gameover-container">

                    {isLeaderboardOpen ? <Leaderboard setOpen={setIsLeaderboardOpen} /> : null}

                </div>
            </>
        </Html>
    )


}
