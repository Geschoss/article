/*
  В примере кода ниже генерируется список фиксаций состояния
  счета игры в течение матча.
  
  Разработайте функцию getScore(gameStamps, offset),
  которая вернет счет на момент offset в списке gameStamps.

  Нужно суметь понять суть написанного кода, заметить нюансы,
  разработать функцию вписывающуюся стилем в существующий код,
  желательно адекватной алгоритмической сложности.
 */

// const TIMESTAMPS_COUNT = 50000;
const TIMESTAMPS_COUNT = 50;

// const PROBABILITY_SCORE_CHANGED = 0.0001;
const PROBABILITY_SCORE_CHANGED = 0.5;
const PROBABILITY_HOME_SCORE = 0.45;
const OFFSET_MAX_STEP = 3;

type Score = {
  home: number;
  away: number;
};

type Stamp = {
  offset: number;
  score: Score;
};

export const generateStamps = (): Stamp[] => {
  const acc: Stamp = {
    offset: 0,
    score: {
      home: 0,
      away: 0,
    },
  };
  const probabilityScoreChanged = 1 - PROBABILITY_SCORE_CHANGED;

  const scoreStamps = Array(TIMESTAMPS_COUNT)
    .fill(undefined)
    .map(() => {
      const scoreChanged = Math.random() > probabilityScoreChanged;

      const homeScoreChanged =
        scoreChanged && Math.random() < PROBABILITY_HOME_SCORE;
      const awayScoreChanged = scoreChanged && !homeScoreChanged;

      acc.offset += Math.floor(Math.random() * OFFSET_MAX_STEP) + 1;

      acc.score.home += homeScoreChanged ? 1 : 0;
      acc.score.away += awayScoreChanged ? 1 : 0;

      return {
        offset: acc.offset,
        score: {
          home: acc.score.home,
          away: acc.score.away,
        },
      };
    });

  return scoreStamps;
};

export const getScore = (gameStamps: Stamp[], offset: number): Score | undefined => {
  let length = gameStamps.length;
  for (let index = 0; index < length; index++) {
    const stamp = gameStamps[index];
    if (stamp.offset === offset) {
      return stamp.score;
    }
    if (stamp.offset > offset) {
      return gameStamps[index-1].score;
    }

  }
  return undefined;
};

const gameStamps = generateStamps();
const score = getScore(gameStamps, 12);
gameStamps;
score;
