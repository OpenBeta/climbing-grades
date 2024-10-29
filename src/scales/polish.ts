import GradeScale, { findScoreRange, getAvgScore, GradeScales, Tuple, getRoundedScoreTuple } from '../GradeScale'
import routes from '../data/routes.json'
import { Route } from '.'
import { GradeBandTypes, routeScoreToBand } from '../GradeBands'

const polishGradeRegex = /^((?:I{1,3})|(?:IV[+]?)|(?:V[+,-]?)|(?:VI(?:\.[1-9])?[+]?)){1}(?:(\/)((?:I{1,3})|(?:IV[+]?)|(?:V[+,-]?)|(?:VI(?:\.[1-9])?[+]?)))?$/i
const isPolish = (grade: string): RegExpMatchArray | null => grade.match(polishGradeRegex)

const PolishScale: GradeScale = {
  displayName: 'Polish Scale',
  name: GradeScales.POLISH,
  offset: 1000,
  allowableConversionType: [GradeScales.YDS, GradeScales.EWBANK, GradeScales.SAXON],
  isType: (grade: string): boolean => {
    if (isPolish(grade) === null) {
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
      return Math.min(Math.max(0, validScore), routes.length - 1)
    }

    if (typeof score === 'number') {
      return routes[validateScore(score)].polish
    }

    const low: string = routes[validateScore(score[0])].polish
    const high: string = routes[validateScore(score[1])].polish
    if (low === high) return low
    return `${low}/${high}`
  },
  getGradeBand: (grade: string): GradeBandTypes => {
    const score = getScore(grade)
    return routeScoreToBand(getAvgScore(score))
  }
}

const getScore = (grade: string): number | Tuple => {
  const parse = isPolish(grade)
  if (parse == null) {
    console.warn(`Unexpected grade format: ${grade} for grade scale polish`)
    return -1
  }
  const [wholeMatch, basicGrade, slash] = parse
  const basicScore = findScoreRange((r: Route) => {
    return r.polish === basicGrade
  }, routes)

  if (wholeMatch !== basicGrade) {
    // 5a/5a+
    let otherGrade
    if (slash !== null) {
      otherGrade = (typeof basicScore === 'number' ? basicScore : basicScore[1]) + 1
    }
    if (otherGrade !== undefined) {
      const nextGrade = findScoreRange(
        (r: Route) => r.polish.toLowerCase() === routes[otherGrade].polish.toLowerCase(),
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

export default PolishScale
