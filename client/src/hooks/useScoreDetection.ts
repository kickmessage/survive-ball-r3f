import { useThree } from "@react-three/fiber"
import { useGameStore } from "../state"
import * as THREE from "three";
import { StateType } from "../types"

export default function useScoreDetection() { //@todo typing
    const isPlayComplete = useGameStore((state: StateType) => state.isPlayComplete);
    const isPlayStarted = useGameStore((state:StateType) => state.isPlayStarted);
    const updateIsPlayComplete = useGameStore((state:StateType) => state.updateIsPlayComplete);
    const updateScoreResult = useGameStore((state:StateType) => state.updateScoreResult);
    const remainingLives = useGameStore((state:StateType) => state.remainingLives);
    const updateRemainingLives = useGameStore((state:any) => state.updateRemainingLives);
    const colorSettings = useGameStore((state:StateType) => state.colorSettings);
    const updateColorSettings = useGameStore((state:StateType) => state.updateColorSettings);
    const currentLevel = useGameStore((state:StateType) => state.currentLevel);
    const updateCurrentLevel = useGameStore((state:StateType) => state.updateCurrentLevel);
    const resetPlay = useGameStore((state:StateType) => state.resetPlay);
    const get = useThree((state) => state.get);
    const levelProgressionCount = useGameStore((state:StateType) => state.levelProgressionCount);
    const updateLevelProgressionCount = useGameStore((state:StateType) => state.updateLevelProgressionCount);
    const difficulty = useGameStore((state:StateType) => state.difficulty);
    const setDifficulty = useGameStore((state:StateType) => state.setDifficulty); 
    const isBallClicked = useGameStore((state:StateType) => state.isBallClicked);
    const updateIsLevelTransition = useGameStore((state:StateType) => state.updateIsLevelTransition);

    const homeRunDetectionWalls = get().scene.children.filter((group) => {
        return group.name === 'home-run-detection-walls'


    })[0]
    const buntDetectionWalls = get().scene.children.filter((group) => {
        return group.name === 'bunt-detection-walls'


    })[0]

    const battingZone = get().scene.children.filter((object) => {
        return object.name === 'batting-zone'
    })[0]

    const startPlayReset = (resetTime: number) => {
        setTimeout(() => {
            resetPlay();

        }, resetTime)

    }

    const detectionRaycaster = new THREE.Raycaster();
    function detectHomeRun(ballPosition: [number,number,number]) {
        if (homeRunDetectionWalls) {
            let rayCasterOrigin = new THREE.Vector3(ballPosition[0], ballPosition[1], ballPosition[2]);
            let rayCasterDirection =  new THREE.Vector3(0, -1 , 0);
            detectionRaycaster.set(rayCasterOrigin, rayCasterDirection)
            let homeRunDetection = detectionRaycaster.intersectObjects(homeRunDetectionWalls.children, true);
            if (homeRunDetection.length > 0 && !isPlayComplete && isPlayStarted) {
                updateIsPlayComplete(true);
                updateScoreResult('run');
                updateLevelProgressionCount(levelProgressionCount+1);
                if (levelProgressionCount === 2) {

                    setTimeout(()=> {
                        updateCurrentLevel(currentLevel+1);
                        updateLevelProgressionCount(0);
                        updateIsLevelTransition(true);
                        setTimeout(()=> {
                            updateIsLevelTransition(false)
                        }, 300);
                        updateColorSettings({
                            ...colorSettings,
                            limit: colorSettings.limit - 100,
                        })

                        setDifficulty(difficulty + 0.33);
                    }, 2000)
                }
                startPlayReset(2000);
            }

        }

    }
    function detectBunt(ballPosition: [number,number,number]) {
        if (buntDetectionWalls) {
            let rayCasterOrigin = new THREE.Vector3(ballPosition[0], ballPosition[1], ballPosition[2]);
            let rayCasterDirection =  new THREE.Vector3(0, -1 , 0);
            detectionRaycaster.set(rayCasterOrigin, rayCasterDirection)
            let buntDetection = detectionRaycaster.intersectObjects(buntDetectionWalls.children, true);
            if (buntDetection.length > 0 && !isPlayComplete && isPlayStarted) {
                updateIsPlayComplete(true);
                updateScoreResult('out')
                updateRemainingLives(remainingLives-1);
                startPlayReset(2000);
            }


        }



    }
    function detectIsBallInStrikeRange(ballPosition:[number,number,number]) {
        if (battingZone) {

            let rayCasterOrigin = new THREE.Vector3(ballPosition[0], ballPosition[1], ballPosition[2]);
            let rayCasterDirection =  new THREE.Vector3(0, -1 , 0);
            detectionRaycaster.set(rayCasterOrigin, rayCasterDirection)
            let battingZoneDetection = detectionRaycaster.intersectObject(battingZone, true);
            if (battingZoneDetection.length > 0 && !isPlayComplete && !isBallClicked) {
                return(true);

            }
        }

    }

    return({ detectHomeRun, detectBunt, startPlayReset, detectIsBallInStrikeRange })


}
