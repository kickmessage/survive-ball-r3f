import "./About.css"

type Props = {
    setOpen: (open:boolean) => void;
}

export default function About({setOpen}:Props) {
    const close = setOpen.bind(null, false);

    return(
        <>
            <div className="about-overlay"
                onClick={()=>close()}
            />

            <div className="about-container">

                <button className="close-button-about" onClick={()=>close()}>X</button> 
                <h4>How to Play</h4>

                <p>
                    <ul>
                        <li>

                            Every ball pitched will come within the strike zone.
                        </li>
                        <li>

                             Once the ball is within strike range, it will change colors from red to green. If you try to hit the ball when it's outside of the strike range, your bat won't make contact!
                        </li>
                        <li>

                            Only home runs count! 

                        </li>
                        <li>

                            Submit your score after a good run to see how you rank up against the world! Best of luck!
                        </li>

                    </ul>





                </p>


            </div>
        </>
    )

}

