# Wordle Like Helper

This program helps you find better guesses for games like wordle and ordlig

## How to use
use the command `npm run start` and follow the instructions. The program auto detects if it's the weekend for ordlig.

## Things to do

- add the ordlig 5-letter words list
- Currently, recognition of letters guessed multiple times is a bit iffy. If a letter is guessed multiple times, but it's not included for all those times (for example, guessing n twice and getting one yellow n) will result in excluded letters in this manner not properly excluded from a space.