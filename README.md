# Word Masters

## Description
Word Masters is a web-based word puzzle game inspired by Wordle. Players attempt to guess a five-letter word within six rounds, receiving feedback on their guesses. The game uses JavaScript to validate words and provide visual feedback on correctness.

## Features
- Interactive word-guessing game with a six-round limit.
- Visual indicators for correctness:
  - **Green** (Correct letter in correct position)
  - **Yellow** (Correct letter in incorrect position)
  - **Gray** (Incorrect letter)
- Fetches a new word daily from an external API.
- Validates user input against a word list.
- Displays a win-or-lose alert based on performance.

## Technologies Used
- HTML
- CSS
- JavaScript
- Fetch API

## Project Structure
```
Word Masters/
├── index.html        # Main HTML structure
├── style.css         # Styling for the game interface
├── word masters.js   # JavaScript logic for game functionality
```

## How to Play
1. Type a five-letter word.
2. Press **Enter** to submit your guess.
3. Colors will indicate correctness.
4. Continue guessing until you win or exhaust six attempts.
5. If you win, an alert appears. If you lose, the correct word is revealed.
