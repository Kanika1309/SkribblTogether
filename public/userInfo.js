const getUserList = async () => {
    return ({
        users: [
            {
                userKey: "0001",
                name: "user1",
                rank: 1,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 10
                }
            },
            {
                userKey: "0002",
                name: "user2",
                rank: 2,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 9
                }
            },
            {
                userKey: "0003",
                name: "user3",
                rank: 3,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 8
                }
            },
            {
                userKey: "0004",
                name: "user4",
                rank: 4,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 7
                }
            },
            {
                userKey: "0005",
                name: "user5",
                rank: 5,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 6
                }
            },
            {
                userKey: "0006",
                name: "user6",
                rank: 6,
                history: {
                    noOfGamesPlayed: 10,
                    noOfGamesWins: 5
                }
            }
        ]
    })
}