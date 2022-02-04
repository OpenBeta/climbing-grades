export type Tuple = [number, number]

export default interface GradeScale {
  isType: (grade: string) => boolean
  getScore: (grade: string) => number | Tuple
  getGrade: (score: number | Tuple) => string
  displayName: string
  name: string
  offset: number
}
export enum GradeScales {
  VScale ='vscale',
  Yds = 'yds',
  Font = 'font',
  French = 'french'
}

export const findScoreRange = (compareFn, list): number | Tuple => {
  const scores = list.filter(compareFn)
    .map(b => b.score)
    .sort((a, b) => a - b)

  const low = scores[0]
  const high = scores[scores.length - 1]
  if (low === undefined) {
    return 0
  }
  if (high === undefined) {
    return low
  }
  return [low, high]
}
export function getAvgScore (score: number | Tuple): number {
  return typeof score === 'number' ? score : (score[1] + score[0]) / 2
}
