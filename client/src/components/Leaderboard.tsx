import "./Leaderboard.css";
import { useLeaderboard } from "../hooks";
import { useState, useEffect } from "react";

type Rank = [string, number];

type Props = {
    setOpen: (open:boolean) => void;
}


export default function Leaderboard({setOpen}: Props) {
    const { getRankings } = useLeaderboard();
    const [rankings, setRankings] = useState<Rank[]>([]);
    const [range,setRange] = useState({
        start: 0,
        end: 10
    })
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const close = setOpen.bind(null, false);

    useEffect(() => {
        async function handleGetRankings(start:number, end:number): Promise<void> {

            setLoading(true);
            const rankings: Rank[] = await getRankings(start,end);
            setRankings(rankings);
            setLoading(false);
        }
        handleGetRankings(range.start, range.end);
    }, []);

    useEffect(()=> {
        async function handleGetRankings(start:number, end:number): Promise<void> {

            setLoading(true);
            const rankings: Rank[] = await getRankings(start,end);
            setRankings(rankings);
            setLoading(false);
        }
        handleGetRankings(range.start, range.end);


    }, [range])


    return (
        <>
            <div className="leaderboard-overlay"
                onClick={()=> close()}

            />

            <div className="leaderboard-container">
                <button className="close-button-leaderboard" onClick={()=>close()}>X</button> 
                <header className="leaderboard-header"></header>
                <span className="leaderboard-list-section-titles">
                    <h3>Rank</h3>
                    <h3>Name</h3>
                    <h3>Level</h3>
                </span>
                <ol className="leaderboard-list">
                    {rankings.map(([name, score], index) => (
                        <li key={index }>
                            <span> {index + 1 + 10*page}</span>
                            <span>{(isLoading) ? (<span></span>) : (name)}</span>
                            <span>{(isLoading) ? (<span></span>) : (score)}</span>
                        </li>
                    ))}
                </ol>
                <div className="leaderboard-page-buttons">
                    <button onClick={()=>
                        {
                        setRange({start: (range.start- 10 > 0) ?  range.start-10 : 0, end: (range.start > 10) ? range.start : 10})
                        setPage(page - 1 > 0 ? page-1 : 0);
                    }
                        }>
                        &larr; 
                    </button>
                    <button onClick={()=>
                        {

                        setRange({start: range.end, end: range.end +10})
                        setPage(page +1);
                    }

                        }>
                        &rarr;
                    </button>
                    <button
                        onClick={()=>
                            {
                            setRange({start: 0, end: range.end - range.start})
                            setPage(0);
                        }
                        }                    >back to top</button>

                </div>
            </div>
        </>

    );
}

