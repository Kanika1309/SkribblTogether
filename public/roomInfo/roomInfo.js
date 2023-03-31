const getRoomInfo = async () => {
    return ({
        rooms: [
            {
                roomAdmin: users[0],
                roomLink: ""+users[0].key,
                noOfPlayers: 6,
                teams: [
                    {
                        noOfMembers: noOfPlayers%2 == 0 ? noOfPlayers%2 : noOfPlayers%2+1,
                        members: [
                            users[0],users[1],users[2]
                        ],
                        teamTotalScore: 40
                    },
                    {
                        noOfMembers: noOfPlayers%2 == 0 ? noOfPlayers%2 : noOfPlayers%2+1,
                        members: [
                            users[3],users[4],users[5]
                        ],
                        teamTotalScore: 50
                    }
                ],
                noOfRounds: 3,
                rounds: [
                    {
                        phrase: "Barking on the wrong tree",
                        guesser:[users[0], users[3]],
                        score: {
                            team1Score: 10,
                            team2Score: 15
                        }
                    },
                    {
                        phrase: "Kill two birds with one stone",
                        guesser:[users[1], users[4]],
                        score: {
                            team1Score: 15,
                            team2Score: 25
                        }
                    },
                    {
                        phrase: "Born with a silver spoon in one's mouth",
                        guesser:[users[2], users[5]],
                        score: {
                            team1Score: 15,
                            team2Score: 10
                        }
                    }
                ],
                winningTeam: teams[1]
            },
        ]
    })
}