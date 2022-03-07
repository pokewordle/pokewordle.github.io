document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    let wordList = ['Ekans', 'Arbok', 'Zubat', 'Gloom', 'Paras', 'Golem', 'Doduo', 'Hypno', 'Ditto', 'Eevee', 'Pichu', 'Aipom', 'Yanma', 'Unown', 'Magby', 'Entei', 'Lugia', 'Ho-oh', 'Lotad', 'Ralts', 'Minun', 'Numel', 'Absol', 'Bagon', 'Shinx', 'Luxio', 'Budew', 'Burmy', 'Gible', 'Riolu', 'Rotom', 'Azelf', 'Snivy', 'Tepig', 'Munna', 'Throh', 'Zorua', 'Klink', 'Klang', 'Deino', 'Inkay', 'Goomy', 'Hoopa', 'Toxel', 'Kubfu'];
    let guessedWords = [[]];
    let availableSpace = 1;
    let word = wordList[Math.floor(Math.random()*wordList.length)];
    let guessedWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button");
    

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes (letter);
        if (!isCorrectLetter){
            return "rgb(50, 50, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter == letterInThatPosition;

        if (isCorrectPosition){
            return "rgb(83, 141, 78)";
        }

        return "rgb(181,159,59)";
    }

    function handleDeleteLetter(){
        const currentWord = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length-1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1))
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !== 5){
            window.alert("Word has to be 5 letters")
        }
        const currentWord = currentWordArr.join('')
        const firstLetterId = guessedWordCount * 5 + 1;

        const interval = 200;
        currentWordArr.forEach((letter,index) => {
            setTimeout(() =>{
                const tileColor = getTileColor(letter, index)
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index)
        })
        guessedWordCount +=1;


        if (currentWord === word) {
            new Promise(r => setTimeout(r, 2000));
            window.alert("Nice")
        }

        if (guessedWords.length === 6) {
            window.alert(`Game Over the word is ${word}`)
        }

        guessedWords.push([])
    }

    // console.log(keys);
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const key = target.getAttribute("data-key");
            console.log(key);
            
            if (key === 'enter'){
                handleSubmitWord()
                return;
            }

            if (key === 'del'){
                handleDeleteLetter();
            }
            updateGuessedWords(key);
        };
        
        
    }
    
    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr()

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter)
            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1; 
            availableSpaceEl.textContent = letter;
        }
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords-1]
    }


    function createSquares(){
        const gameBoard = document.getElementById("board")
            for (let index = 0; index < 30; index++) {
                let square = document.createElement("div");
                square.classList.add("square");
                square.classList.add("animate__animated")
                square.setAttribute("id", index + 1);
                gameBoard.appendChild(square);
                
            }
    }
})