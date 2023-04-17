import { create } from "zustand";
import { ScoreResultType, ColorSettings, StateType } from "../types"





const useGameStore = create<StateType>()((set, get) => ({
    isPlayStarted: false,
    isBallPitched: false,
    isBallClicked: false,
    isPlayComplete: false,
    isBatEnabled: true,
    isPaused: false,
    isLevelTransition: false,
    scoreResult: null,
    remainingLives: 3,
    difficulty: 1,
    colorSettings: {
        range: 25, 
        limit: 350,
    },
    currentLevel: 1,
    levelProgressionCount: 0,
    setDifficulty: (newDiff: number) => set(() => ({difficulty: newDiff})),
    updateLevelProgressionCount: (newCount:number) => set(()=> ({levelProgressionCount: newCount})),
    updateCurrentLevel: (newLevel:number) => set(()=> ({currentLevel: newLevel})),
    updateColorSettings: (newSettings: ColorSettings) => set(()=> ({colorSettings: newSettings})),
    updateIsPaused: (status:boolean) => set(() => ({isPaused: status})),
    updateIsPlayStarted: (status:boolean) => set(()=> ({isPlayStarted:status})),
    updateIsBallPitched: (status: boolean) => set(() => ({isBallPitched:status})),
    updateIsBallClicked: (status: boolean) => set(() => ({isBallClicked:status})),
    updateIsPlayComplete: (status: boolean) => set(() => ({isPlayComplete:status})),
    updateIsBatEnabled: (status: boolean) => set(() => ({isBatEnabled:status})),
    updateScoreResult: (status: ScoreResultType) => set(() => ({scoreResult:status})),
    updateRemainingLives: (status: number) => set(() => ({remainingLives: status})),
    updateIsLevelTransition: (status:boolean) => set(()=> ({isLevelTransition: status})),
    resetPlay: () => set(({
        isBallPitched: false,
        isBallClicked: false,
        isPlayStarted: false,
        isPlayComplete: false,
        isBatEnabled: true,
        scoreResult: null,
    })),
    //used for tracking ball position in the line streak component.
    //not exactly the cleanest solution but the alternative solution requires a lot of refactoring of components
    //so this gets the job done,
    //and doesn't incurr on performance in comparison
    currentBallPosition: null,
    updateCurrentBallPosition: (newPosition: [number,number,number]) => set(() => ({currentBallPosition: newPosition})),




}))

export { useGameStore }
