import boulder from '../data/boulder.json'
import GradeScale, { findScoreRange, getAvgScore, GradeScales, Tuple, getRoundedScoreTuple } from '../GradeScale'

import { Boulder } from '.'
import { boulderScoreToBand, GradeBandTypes } from '../GradeBands'

const fontGradeRegex = /^([1-9][a-c][+]?){1}(?:(\/)([1-9][a-c][+]?))?$/i
// Supports 1a -> 9c+, slash grades i.e. 5a/5a+ or 6a+/6b
// NOTE: this currently assumes "incorrect" slash grades follows the normal pattern
// i.e. 6b+/5a => 6b+/6c
const isFont = (grade: string): RegExpMatchArray | null => grade.match(fontGradeRegex)

const FontScale: GradeScale = {
  displayName: 'Fontainebleau',
  name: GradeScales.FONT,
  offset: 1000,
  allowableConversionType: [GradeScales.VSCALE],
  isType: (grade: string): boolean => {
    if (isFont(grade) === null) {
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
      return Math.min(Math.max(0, validScore), boulder.length - 1)
    }

    if (typeof score === 'number') {
      return boulder[validateScore(score)].font
    }

    const low: string = boulder[validateScore(score[0])].font
    const high: string = boulder[validateScore(score[1])].font
    if (low === high) return low
    return `${low}/${high}`
  },
  getGradeBand: (grade: string): GradeBandTypes => {
    const score = getScore(grade)
    return boulderScoreToBand(getAvgScore(score))
  }
}

const getScore = (grade: string): number | Tuple => {
  const parse = isFont(grade)
  if (parse == null) {
    console.warn(`Unexpected grade format: ${grade} for grade scale font`)
    return -1
  }
  const [wholeMatch, basicGrade, slash] = parse
  const basicScore = findScoreRange((b: Boulder) => {
    return b.font === basicGrade
  }, boulder)

  if (wholeMatch !== basicGrade) {
    // 5a/5a+
    let otherGrade
    if (slash !== null) {
      otherGrade = (typeof basicScore === 'number' ? basicScore : basicScore[1]) + 1
    }
    if (otherGrade !== undefined) {
      const nextGrade = findScoreRange(
        (r: Boulder) => r.font.toLowerCase() === boulder[otherGrade].font.toLowerCase(),
        boulder
      )
      const basicAvg = getAvgScore(basicScore)
      const nextGradeAvg = getAvgScore(nextGrade)
      const tuple = getRoundedScoreTuple(basicAvg, nextGradeAvg)
      return tuple
    }
  }
  return basicScore
}

export default FontScale
