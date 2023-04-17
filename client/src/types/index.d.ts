export type ScoreResultType = "run" | "out" | null;

export interface ColorSettings {
    range: number,
    limit: number
}


export type StateType = {
    isPlayStarted: boolean,
    isBallPitched: boolean,
    isBallClicked: boolean,
    isPlayComplete: boolean,
    isBatEnabled: boolean,
    scoreResult: ScoreResultType,
    remainingLives: number,
    difficulty: number,
    isPaused: boolean,
    isLevelTransition: boolean,
    colorSettings: {
        range: number,
        limit: number
    }
    currentLevel: number,
    levelProgressionCount: number,
    setDifficulty: (newDiff: number) => void,
    updateLevelProgressionCount: (newCount: number) => void,
    updateCurrentLevel: (newLevel: number) => void,
    updateColorSettings: (newSettings: ColorSettings) => void,
    updateIsPaused: (status: boolean) => void,
    updateIsPlayStarted: (status:boolean) => void,
    updateIsBallPitched: (status:boolean) => void,
    updateIsBallClicked: (status:boolean) => void,
    updateIsPlayComplete: (status:boolean) => void,
    updateIsBatEnabled: (status:boolean) => void,
    updateScoreResult: (status: ScoreResultType) => void,
    updateRemainingLives: (status: number) => void,
    updateIsLevelTransition: (status: boolean) => void,
    resetPlay: () => void,
    currentBallPosition: null | [number, number, number],
    updateCurrentBallPosition: (newPosition: [number, number, number]) => void,


}
