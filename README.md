# Exploding_kitten_game


## Installation
Client Installation
```
cd client
npm install
npm start
```
Server Installation
```
cd server
npm install
npm start
```

## Rules
```
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is shuffle card, then the game is restarted and the deck is filled with 5 cards again.
```
##NOTE
``` 
Inorder to run server need to configure REDIS. Create .env file in server (sample of .env is provided in code as .env_sample) and enter the details.
```
