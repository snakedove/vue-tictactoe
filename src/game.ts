interface Row {
  fields: string[],
  userCount: number,
  computerCount: number
}

interface Rows {
  "row1": Row,
  "row2": Row,
  "row3": Row,
  "row4": Row,
  "row5": Row,
  "row6": Row,
  "row7": Row,
  "row8": Row,
  [key: string]: Row
}

export interface Fields {
  "00": string;
  "01": string;
  "02": string;
  "10": string;
  "11": string;
  "12": string;
  "20": string;
  "21": string;
  "22": string;
  [key: string]: string;
}

interface Messages {
  "userWon": string[];
  "computerWon": string[];
  "nobodyWon": string[];
  [key: string]: string[];
}

export class Game {

  public rows: Rows;
  public fields: Fields;
  public messages: Messages;
  public computerTurn: boolean;
  public won: string;
  public highScoreMessage: string;
  public playMessage: string;
  public moves: number;
  public level: string;
  public showBanner: boolean;
  public showMessage: boolean;
  public showButton: boolean;
  public bannerTimeout: number;
  public player: string;
  public title: string;
  public theme: string;

  constructor() {
    this.title = 'TicTacToe';

    this.theme = 'dark';

    this.rows = {
      "row1": {"fields": ['00', '10', '20'], "userCount": 0, "computerCount": 0},
      "row2": {"fields": ['01', '11', '21'], "userCount": 0, "computerCount": 0},
      "row3": {"fields": ['02', '12', '22'], "userCount": 0, "computerCount": 0},
      "row4": {"fields": ['00', '01', '02'], "userCount": 0, "computerCount": 0},
      "row5": {"fields": ['10', '11', '12'], "userCount": 0, "computerCount": 0},
      "row6": {"fields": ['20', '21', '22'], "userCount": 0, "computerCount": 0},
      "row7": {"fields": ['00', '11', '22'], "userCount": 0, "computerCount": 0},
      "row8": {"fields": ['02', '11', '20'], "userCount": 0, "computerCount": 0}
    };

    this.fields = {
      "00": '',
      "01": '',
      "02": '',
      "10": '',
      "11": '',
      "12": '',
      "20": '',
      "21": '',
      "22": ''
    };

    this.messages = {
      "userWon": ['   you    ', '  won :-) '],
      "computerWon": ['   you    ', ' lost :-( '],
      "nobodyWon": ['  nobody  ', ' won :-|  '],
    };

    this.computerTurn = false;

    this.won = '';

    this.highScoreMessage = "";

    this.playMessage = "";

    this.moves = 0;

    this.level = 'easy';

    this.showBanner = false;

    this.showMessage = false;

    this.bannerTimeout = 2000;

    this.player = "Unknown";

    this.showButton = false;
  }
}
