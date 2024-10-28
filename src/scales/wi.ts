import GradeScale, { findScoreRange, getAvgScore, GradeScales, Tuple } from '../GradeScale'
import ice_table from '../data/ice.json'
import { IceGrade } from '.'
import { GradeBandTypes, routeScoreToBand } from '../GradeBands'

// Supports WI1 -> WI13, with + grades on WI3 -> WI13 and no slash grades
// https://en.wikipedia.org/wiki/Grade_(climbing)#Ice_and_mixed_climbing
const wiGradeRegex = /^(WI)([1-2]|[3-9]\+?|1[0-3]\+?)$/

const isWI = (grade: string): RegExpMatchArray | null => grade.match(wiGradeRegex)

const WIScale: GradeScale = {
  displayName: 'WI Grade',
  name: GradeScales.WI,
  offset: 1000,
  conversionGroup: 'Ice',
  isType: (grade: string): boolean => {
    if (isWI(grade) === null) {
      return false
    }
    return true
  },
  getScore: (grade: string): number | Tuple => {
    return getScore(grade)
  },
  getGrade: (score: number | Tuple): string => {
    const validateScore = (score: number): number => {
      const validScore = Number.isInteger(score) ? score : Math.ceil(score)
      return Math.min(Math.max(0, validScore), ice_table.length - 1)
    }

    if (typeof score === 'number') {
      return ice_table[validateScore(score)].wi
    }

    const low: string = ice_table[validateScore(score[0])].wi
    const high: string = ice_table[validateScore(score[1])].wi
    if (low === high) return low
    return `${low}/${high}`
  },
  getGradeBand: (grade: string): GradeBandTypes => {
    const score = getScore(grade)
    return routeScoreToBand(getAvgScore(score))
  }
}

const getScore = (grade: string): number | Tuple => {
  const parse = isWI(grade)
  if (parse == null) {
    console.warn(`Unexpected grade format: ${grade} for grade scale WI`)
    return -1
  }
  const [wholeMatch, prefix, gradeNum] = parse // eslint-disable-line @typescript-eslint/no-unused-vars

  const score = findScoreRange((r: IceGrade) => {
    return r.wi === (wholeMatch)
  }, ice_table)

  return score
}

export default WIScale
