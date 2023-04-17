import { Html, ScreenSpace } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useGameStore } from "../state";
import { shallow } from "zustand/shallow";
import { useScoreDetection } from "../hooks";
import { useHistory } from "react-router-dom";
import { StateType } from "../types"
import "./PauseMenu.css";


export default function PauseMenu() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { startPlayReset } = useScoreDetection();
    const history = useHistory();
    const { remainingLives, updateRemainingLives, isPaused, isPlayComplete, updateIsPaused } = useGameStore((state:StateType) => ({
        remainingLives: state.remainingLives,
        updateRemainingLives: state.updateRemainingLives,
        isPaused: state.isPaused,
        updateIsPaused: state.updateIsPaused,
        isPlayComplete: state.isPlayComplete


    }), shallow)


    function handleEscPress(event: KeyboardEvent) {
        if (event.key === "Escape") {

            //disallow pause menu while game over menu is open/about to open
            if (remainingLives > 0 && !isPlayComplete) {
                if (!isOpen) {
                    setIsVisible(!isVisible);
                    //pause the physics engine
                    updateIsPaused(!isPaused);
                    setIsOpen(!isOpen);
                }
                if (isOpen) {
                    setIsVisible(!isVisible);
                    updateIsPaused(!isPaused);
                    setIsOpen(!isOpen);
                }

            }


        }
    }
    useEffect(() => {


        document.addEventListener('keyup', handleEscPress);

        return () => {
            document.removeEventListener('keyup', handleEscPress);
        };
    });

    function handleClick(buttonAction: 'out' | 'restart' | 'play' | 'menu' ) {
        if (buttonAction === 'restart') {
            window.location.reload();


        }

        if (buttonAction === "out") {
            updateRemainingLives(remainingLives - 1)
            setIsVisible(!isVisible);
            updateIsPaused(!isPaused);
            startPlayReset(1);
            setIsOpen(!isOpen);


        }

        if (buttonAction === "play") {
            setIsOpen(!isOpen)
            setIsVisible(!isVisible);
            updateIsPaused(!isPaused);


        }

        if(buttonAction === "menu") {
            history.push('/splash')




        }


    }

    if (isOpen) {
        return(

            <ScreenSpace
                depth={1}
            >

                <Html
                    center
                    occlude={!isVisible}
                >
                    <div className="pause-menu">

                        <h1>Menu</h1>
                        <div className="pause-menu-buttons-container">
                            <button
                                onClick={(e) => {handleClick('play')}}                               
                            >
                                Continue 
                            </button>



                            <button

                                onClick={(e) => {handleClick('out')}}                               
                            >
                                Self Out  
                                <span className="self-out-sub-text">If you're stuck!</span>
                            </button>
                            <button
                                onClick={(e) => {handleClick('restart')}}                               
                            >
                                Restart 
                            </button>


                            <button
                                onClick={(e) => {handleClick('menu')}}                               
                            >
                                Main Menu 
                            </button>

                        </div>

                    </div>

                </Html>

            </ScreenSpace>


        )
    }
    else {
            return(


                <Html
                    center
                    occlude={!isVisible}
                >
                    <div className="pause-menu">

                        <h1>Menu</h1>
                        <div className="pause-menu-buttons-container">
                            <button
                                onClick={(e) => {handleClick('play')}}                               
                            >
                                Continue 
                            </button>



                            <button

                                onClick={(e) => {handleClick('out')}}                               
                            >
                                Self Out  
                                <span className="self-out-sub-text">If you're stuck!</span>
                            </button>
                            <button
                                onClick={(e) => {handleClick('restart')}}                               
                            >
                                Restart 
                            </button>


                            <button
                                onClick={(e) => {handleClick('menu')}}                               
                            >
                                Main Menu 
                            </button>

                        </div>

                    </div>

                </Html>



        )

    }



}
