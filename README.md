# Skribbl Together

* It is a team game where one member has to guess the phrase, while others
pass the drawing one after another in order to complete it.
* Used Socket.IO library to provide real-time, bidirectional communication
between clients and servers.
* Tech Used - HTML , CSS , JavaScript, NodeJS, MongoDB, Express

Steps:
1.	User will generate the room.
2.	User will provide the information regarding the room which includes: room name,  no. of rooms and no. of players in each team.
3.	System will generate a sharable unique password for that room.
4.	Each player will join the room using room name and password (he can only join a team that has space).
5.	Once all the players joined, teams will start playing as follows:
    i.	 System will choose the guesser.
    ii.	 Phrase will be shown to all the players except the guesser.
    iii. The player who has the green sign will start drawing.
    iv.	 Guesser will guess the phrase. 
6.	System will display the overall score after each round for all the teams.
(score will be decided by the factor: time taken)
7.	Players will decide whether to continue or not after every round.
8.	Winner will be decided according to the total score at last.
9.	Rank of each player will be decided by the factor: number of times his team wins when he played in a team.
