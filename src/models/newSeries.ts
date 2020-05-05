import Player from '@/models/player'

export default class NewSeries {
  private data: {
    date: Date;
    closed: boolean;
    countsRamsch: boolean;
    negativeNotation: boolean;
    notes?: string;
    players: (Player | null)[];
  }

  constructor () {
    this.data = {
      date: new Date(),
      closed: false,
      countsRamsch: false,
      negativeNotation: false,
      notes: undefined,
      players: [null, null, null]
    }
  }

  get players () {
    return this.data.players
  }

  set players (v: (Player | null)[]) {
    this.data.players = v
  }

  setPlayer (index: number, player: Player) {
    this.data.players = this.data.players.map((v, i) => {
      return (i === index) ? player : v
    })
  }

  get createRequestParams () {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      date: this.data.date.toISOString().slice(0, 10),
      number_of_players: this.players.length, // convert to snake-case
      closed: this.data.closed,
      countsRamsch: this.data.countsRamsch,
      negative_notation: this.data.negativeNotation,
      notes: this.data.notes,
      first_player_id: this.players[0] ? this.players[0].id : 0,
      second_player_id: this.players[1] ? this.players[1].id : 0,
      third_player_id: this.players[2] ? this.players[2].id : 0,
      fourth_player_id: this.players[3] ? this.players[3].id : undefined,
      fifth_player_id: this.players[4] ? this.players[4].id : undefined
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }

  get isValid () {
    return !this.players.some(p => p === null)
  }
}
