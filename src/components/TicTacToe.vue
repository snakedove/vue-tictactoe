<template>
    <div :class="'ttt-container' + ' ' + theme">
        <overlay :show-banner="showBanner" :show-button="showButton" :play-message="playMessage" :won="won"
                 @button-click="handleButtonClick"/>
        <header class="top-container">
            <div class="left-container">
                <a :class="'level' + ' ' + level + ' btn'" @click.prevent="changeLevel">
                    level: {{ level }}
                </a>
                <div class="icon-container" :class="{ bright: theme === 'light', dark: theme === 'dark' }"
                     @click="toggleTheme">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M22 8.51v1.372h-2.538c.02-.223.038-.448.038-.681 0-.237-.017-.464-.035-.69h2.535zm-10.648-6.553v-1.957h1.371v1.964c-.242-.022-.484-.035-.726-.035-.215 0-.43.01-.645.028zm5.521 1.544l1.57-1.743 1.019.918-1.603 1.777c-.25-.297-.593-.672-.986-.952zm-10.738.952l-1.603-1.777 1.019-.918 1.57 1.743c-.392.28-.736.655-.986.952zm-1.597 5.429h-2.538v-1.372h2.535c-.018.226-.035.454-.035.691 0 .233.018.458.038.681zm9.462 9.118h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-4.5l1.188.782c.154.138.38.218.615.218h.895c.234 0 .461-.08.615-.218l1.187-.782zm3.75-13.799c0 3.569-3.214 5.983-3.214 8.799h-1.989c-.003-1.858.87-3.389 1.721-4.867.761-1.325 1.482-2.577 1.482-3.932 0-2.592-2.075-3.772-4.003-3.772-1.925 0-3.997 1.18-3.997 3.772 0 1.355.721 2.607 1.482 3.932.851 1.478 1.725 3.009 1.72 4.867h-1.988c0-2.816-3.214-5.23-3.214-8.799 0-3.723 2.998-5.772 5.997-5.772 3.001 0 6.003 2.051 6.003 5.772z"/>
                    </svg>
                </div>
                <div class="player">
                    <label v-if="!isMobile" class="label player-label" for="player-name">Player: </label>
                    <input id="player-name" v-model="player" type="text" class="input" @change="updateHighScore"/>
                </div>
            </div>
            <div class="highscore btn">
                <span class="highscore-message">Highscore</span>
                <span class="highscore-message">{{ highScoreMessage }}</span>
                <a class="delete btn" @click.prevent="clearHighScore">delete highscore</a>
            </div>
        </header>
        <h1 class="container-el">{{ title }}</h1>
        <div class="squares container-el">
            <transition name="fade">
                <div v-show="false" class="messages container-el">
                    <div class="message-bg"></div>
                    <div class="message-text">{{ playMessage }}</div>
                </div>
            </transition>
            <div :key="key" v-for="(key, row) in 3" class="square-row">
                <square :field="fields[row.toString()+square.toString()]" :key="k" v-for="(k, square) in 3"
                        :id="'f'+row.toString()+square.toString()" :won="won" :computer-turn="computerTurn"
                        @square-clicked="click"/>
            </div>
        </div>
        <footer class="footer">
            <span class="footer-content">
              created with vuejs by <a href="https://github.com/snakedove">github/snakedove</a> | type-safe with TypeScript
            </span>
        </footer>
    </div>
</template>

<script>
    import Square from './tictactoe/Square.vue';
    import Overlay from './tictactoe/Overlay.vue';
    import {isMobile} from '../helper';

    const {Game} = require('../game');

    // styles
    import '../styles/styles.scss';

    export default {
        data: () => {
            return new Game();
        },

        components: {
            Square,
            Overlay,
        },

        created() {
            this.setUp();
        },

        methods: {
            handleButtonClick() {
                this.toggleButton();
                this.setUp();
            },

            setTitle(title) {
                this.title = title;
            },

            toggleTheme() {
                this.theme = this.theme === 'dark' ? 'light' : 'dark'
            },

            changeLevel() {
                this.setUp();
                this.toggleLevel();
            },

            click(id) {
                if (this.fields[id] === '') {
                    this.fields[id] = 'user';
                    this.moves = this.moves + 1;
                }
                this.updateData(false);
                this.checkIfSomebodyWon();
                if (!this.won) {
                    this.computerMove();
                }
            },

            setPlayer() {
                localStorage.setItem('ttt-p', this.player);
            },

            cleanConf(all) {
                for (let rowKey in this.rows) {
                    if (this.rows.hasOwnProperty(rowKey)) {
                        this.rows[rowKey].userCount = 0;
                        this.rows[rowKey].computerCount = 0;
                    }
                }
                if (all) {
                    for (let key in this.fields) {
                        this.fields[key] = '';
                    }
                    this.computerTurn = false;
                    this.won = '';
                    this.moves = 0;
                    this.showButton = false;
                }
            },

            setCountPerRow() {
                for (let key in this.fields) {
                    if (this.fields.hasOwnProperty(key)) {
                        if (this.fields[key] === 'computer') {
                            for (let compRowKey in this.rows) {
                                if (this.rows.hasOwnProperty(compRowKey)) {
                                    let foundCValue = false;
                                    this.rows[compRowKey].fields.forEach((value) => {
                                        if (value === key) {
                                            foundCValue = true;
                                        }
                                    });
                                    if (foundCValue) {
                                        this.rows[compRowKey].computerCount++;
                                    }
                                }
                            }
                        }

                        if (this.fields[key] === 'user') {
                            for (let userRowKey in this.rows) {
                                if (this.rows.hasOwnProperty(userRowKey)) {
                                    let foundUValue = false;
                                    this.rows[userRowKey].fields.forEach((value) => {
                                        if (value === key) {
                                            foundUValue = true;
                                        }
                                    });
                                    if (foundUValue) {
                                        this.rows[userRowKey].userCount++;
                                    }
                                }
                            }
                        }
                    }
                }
            },

            pushToPriority(prios, rowKey, priorityKey) {
                let found = false;
                for (let key in prios[priorityKey]) {
                    if (prios[priorityKey][key] === rowKey) {
                        found = true;
                    }
                }
                if (!found) {
                    prios[priorityKey].push(rowKey);
                }
            },

            clearHighScore() {
                this.updateHighScore(true);
            },

            updateHighScore(reset) {
                let highScoreString = localStorage.getItem('ttt-hs');

                if (reset || typeof highScoreString === 'undefined' || highScoreString === null) {
                    localStorage.setItem('ttt-hs', JSON.stringify({
                        'easy': {user: 0, computer: 0},
                        'hard': {user: 0, computer: 0}
                    }));

                    this.highScoreMessage = this.player + ': 0 computer: 0';

                } else {
                    let hs = JSON.parse(highScoreString);

                    if (this.won !== '' && this.won !== 'nobody') {
                        hs[this.level][this.won] += 1;
                        localStorage.setItem('ttt-hs', JSON.stringify(hs));
                    }

                    this.highScoreMessage = this.player + ': ' + hs[this.level].user + ' computer: ' + hs[this.level].computer;
                }

                this.setPlayer();
            },

            computerMove() {
                this.computerTurn = true;
                this.setMessage('computerTurn');

                setTimeout(() => {
                    let fieldId = this.getId;

                    if (fieldId !== '') {
                        this.fields[fieldId] = 'computer'
                    }

                    this.moves++;
                    this.updateData(false);
                    this.computerTurn = false;
                    this.checkIfSomebodyWon();

                    if (!this.won) {
                        this.setMessage('userTurn');
                    }
                }, 1000);
            },

            toggleButton() {
                this.showButton = !this.showButton;
                this.showBanner = false;
            },

            updateLevel() {
                let lString = localStorage.getItem('ttt-l');

                if (typeof lString === 'undefined' || lString === null) {
                    localStorage.setItem('ttt-l', 'easy');
                    this.level = 'easy';
                } else {
                    this.level = lString;
                }
            },

            setLevel(level) {
                localStorage.setItem('ttt-l', level);
                this.level = level;
            },

            toggleLevel() {
                this.setLevel(this.level === 'hard' ? 'easy' : 'hard');
                this.updateHighScore();
            },

            setMessage(messageKey) {
                this.playMessage = this.messages[messageKey];
            },

            updateData(doIt) {
                this.cleanConf(doIt);
                this.setCountPerRow();
            },

            setUp() {
                this.updatePlayer();
                this.updateLevel();
                this.updateData(true);
                this.updateHighScore();
                this.setMessage('userTurn');

                let lettersOrig = this.title;
                setInterval(() => {
                    let letters = lettersOrig.split('');
                    let ox = ['o', 'x'];
                    letters[Math.floor(Math.random() * letters.length)] = ox[Math.round(Math.random())];
                    this.setTitle(letters.join(''));
                    setTimeout(() => {
                        this.setTitle(lettersOrig)
                    }, 50);
                }, 500);
            },

            updatePlayer() {
                let name = localStorage.getItem('ttt-p');

                if (typeof name === 'undefined' || name === null) {
                    localStorage.setItem('ttt-p', 'Unknown');
                    this.player = 'Unknown';
                } else {
                    this.player = name;
                }
            },

            checkIfSomebodyWon() {
                for (let rowKey in this.rows) {
                    if (this.rows.hasOwnProperty(rowKey)) {
                        if (this.rows[rowKey].userCount === 3) {
                            this.won = 'user';
                        } else if (this.rows[rowKey].computerCount === 3) {
                            this.won = 'computer';
                        }
                    }
                }
                if (this.moves === 9 && this.won === '') {
                    this.won = 'nobody';
                }
                if (this.won !== '') {
                    this.setMessage(this.won + 'Won');
                    this.showBanner = true;

                    if (this.won !== 'nobody') {
                        this.updateHighScore();
                    }

                    setTimeout(() => {
                        this.showButton = true;
                    }, this.bannerTimeout)
                }
            },

            checkRowFull(rowName) {
                let rows = this.rows;
                let count = rows[rowName].computerCount + rows[rowName].userCount;

                return count > 2;
            },

            findFreeField(rowKey) {
                let fieldToMoveIn = '';

                if (this.moves === 1 && this.level === 'hard') {
                    fieldToMoveIn = this.getFieldToMoveIn;
                    if (fieldToMoveIn !== '') {
                        return fieldToMoveIn;
                    }
                }

                let fieldIds = [];

                this.rows[rowKey].fields.forEach((value) => {
                    let fieldValue = this.fields[value];
                    if (fieldValue === '') {
                        fieldIds.push(value);
                    }
                });

                let random = Math.floor((Math.random() * (fieldIds.length)));
                if (fieldIds.length === 0) {
                    return '';
                }

                return fieldIds[random];
            },
        },

        computed: {
            isMobile() {
                return isMobile();
            },

            getRowToMoveIn() {
                let prios = {
                    '1': [],
                    '2': [],
                    '3': [],
                    '4': [],
                    '5': [],
                    '6': []
                };

                let rows = this.rows;

                for (let rowKey in rows) {
                    if (rows.hasOwnProperty(rowKey) && this.checkRowFull(rowKey) === false) {
                        //set priorities for moves
                        let cc = rows[rowKey].computerCount;
                        let uc = rows[rowKey].userCount;

                        if (cc === 0 && uc === 0) {
                            this.pushToPriority(prios, rowKey, '4');
                        }

                        if (cc === 0 && uc === 1) {
                            this.pushToPriority(prios, rowKey, '6');
                        }

                        if (cc === 1 && uc === 0) {
                            this.pushToPriority(prios, rowKey, '3');
                        }

                        if (cc === 1 && uc === 1) {
                            this.pushToPriority(prios, rowKey, '5');
                        }

                        if (cc === 2 && uc === 0) {
                            if (this.level === 'hard') {
                                this.pushToPriority(prios, rowKey, '1');
                            } else {
                                this.pushToPriority(prios, rowKey, '2');
                            }
                        }

                        if (cc === 0 && uc === 2) {
                            if (this.level === 'hard') {
                                this.pushToPriority(prios, rowKey, '2');
                            } else {
                                this.pushToPriority(prios, rowKey, '1');
                            }
                        }
                    }
                }

                for (let i = 1; i < 7; i++) {
                    let ii = i.toString();
                    if (prios[ii].length) {
                        let random = Math.floor((Math.random() * (prios[ii].length)));
                        return prios[ii][random];
                    }
                }

                return '';
            },

            getFieldToMoveIn() {
                let possibleIds = [];

                for (let key in this.fields) {
                    if (this.fields.hasOwnProperty(key) && this.fields[key] !== '') {
                        let userId = key.split('');
                        let tests = [
                            [-1, -2],
                            [-1, 2],
                            [1, -2],
                            [1, 2],
                            [-2, -1],
                            [-2, 1],
                            [2, -1],
                            [2, 1],
                        ];
                        tests.forEach((value, index) => {
                            let x = parseInt(userId[0]);
                            let y = parseInt(userId[1]);
                            x += tests[index][0];
                            y += tests[index][1];
                            let testId = x.toString() + y.toString();
                            if (typeof this.fields[testId] !== 'undefined') {
                                possibleIds.push(testId)
                            }
                        })
                    }
                }

                let random = Math.floor((Math.random() * (possibleIds.length)));

                if (typeof possibleIds[random] !== 'undefined') {
                    return possibleIds[random];
                }
                return '';
            },

            getId() {
                let fieldId = '';
                let rowId = this.getRowToMoveIn;
                if (rowId !== '' && this.won === '') {
                    fieldId = this.findFreeField(rowId);
                }
                return fieldId;
            },
        }
    }
</script>

<style lang="scss">
    // no styles here
</style>
