import GradeScale, { findScoreRange, getAvgScore, GradeScales, getRoundedScoreTuple, Tuple } from '../GradeScale'
import routes from '../data/routes.json'
import { Route } from '.'
import { GradeBandTypes, routeScoreToBand } from '../GradeBands'

// Supports 1 -> 40, slash grades i.e. 25/26
// NOTE: this currently assumes "incorrect" slash grades follows the normal pattern
// i.e. 26/35 => 26/27
// NOTE: +/- grades are rare for Ewbank.  May want to allow them later.
// Might be simpler to just parse as two integers and check range.
const ewbankGradeRegex = /^(([1-9])|([1-3][0-9])|(40)){1}(?:(\/)(([1-9])|([1-3][0-9])|(40)))?$/i
const isEwbank = (grade: string): RegExpMatchArray | null => grade.match(ewbankGradeRegex)

const EwbankScale: GradeScale = {
  displayName: 'Ewbank Grade',
  name: GradeScales.EWBANK,
  offset: 1000,
  conversionGroup: 'Free',
  isType: (grade: string): boolean => {
    if (isEwbank(grade) === null) {
      return false
    }
    return true
  },
  getScore: (grade: string): number | Tuple => {
    return getScore(grade)
  },
  getGrade: (score: number | Tuple): string => {
    const validateScore = (score: number): string => {
      const validScore = Number.isInteger(score) ? score : Math.ceil(score)
      const index = Math.min(Math.max(0, validScore), routes.length - 1)
      return routes[index].ewbank
    }

    if (typeof score === 'number') {
      return validateScore(score)
    }

    const low: string = validateScore(score[0])
    const high: string = validateScore(score[1])
    if (low === high) return low
    return `${low}/${high}`
  },
  getGradeBand: (grade: string): GradeBandTypes => {
    const score = getScore(grade)
    return routeScoreToBand(getAvgScore(score))
  }
}

const getScore = (grade: string): number | Tuple => {
  const parse = isEwbank(grade)
  if (parse == null) {
    console.warn(`Unexpected grade format: ${grade} for grade scale Ewbank`)
    return -1
  }
  const [wholeMatch, basicGrade, slash] = parse
  const basicScore = findScoreRange((r: Route) => {
    return r.ewbank === basicGrade
  }, routes)

  if (wholeMatch !== basicGrade) {
    // Slash grade
    let otherGrade
    if (slash !== null) {
      otherGrade = (typeof basicScore === 'number' ? basicScore : basicScore[1]) + 1
    }
    if (otherGrade !== undefined) {
      const nextGrade = findScoreRange(
        (r: Route) => r.ewbank === routes[otherGrade].ewbank,
        routes
      )
      const basicAvg = getAvgScore(basicScore)
      const nextGradeAvg = getAvgScore(nextGrade)
      const tuple = getRoundedScoreTuple(basicAvg, nextGradeAvg)
      return tuple
    }
  }
  return basicScore
}

export default EwbankScale
