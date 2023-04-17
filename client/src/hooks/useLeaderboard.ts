interface Form {
    username: string,
    score: string 
}
export default function useLeaderboard() {

    async function submitForm(form: Form) {
        await fetch("https://sb-server.us-3.evennode.com/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(form)


        })
        .catch( error => {
            window.alert(error);
            return
        })



    }

    type Rank = [string, number]

    async function getRankings(start:number, end:number): Promise<Rank[]>  {
        const response = await fetch(`https://sb-server.us-3.evennode.com/rankings/${start}-${end}`);
        const rankings = await response.json();
        return(rankings);


    }

    return({ submitForm, getRankings });
}











