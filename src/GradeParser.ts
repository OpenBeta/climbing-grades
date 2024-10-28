import GradeScale, { GradeScales, GradeScalesTypes, Tuple } from './GradeScale'
import { scales } from './scales'

/**
 *
 * @param gradeScaleType grade scale type
 * @returns grade scale of provided grade scale name
 */
export const getScale = (gradeScaleType: GradeScalesTypes): GradeScale | null => {
  const scale = scales[gradeScaleType]
  if (scale === null) {
    console.warn(`Scale: ${gradeScaleType} isn't currently supported`)
  }
  return scale
}

/**
 * @deprecated Replace with individual grade scale's getScore
 * @param grade grade based on grade scale type
 * @param gradeScaleType grade scale type
 * @returns  the score range, allows us to show the range of overlap for other grading systems
 */
export const getScore = (grade: string, gradeScaleType: GradeScalesTypes): number | Tuple => {
  const scale = getScale(gradeScaleType)
  if (scale === null) {
    return -1
  }
  return scale.getScore(grade)
}

/**
 * @deprecated Replace with individual grade scale's getScore
 * @param grade grade based on grade scale type
 * @param gradeScaleType grade scale type
 * @returns the average score of the grade for sorting across different scales
 */
export const getScoreForSort = (grade: string, gradeScaleType: GradeScalesTypes): number => {
  const range = getScore(grade, gradeScaleType)
  return typeof range === 'number' ? range : (range[1] + range[0]) / 2
}

/**
 *
 * @param fromGrade grade based on grade scale type
 * @param fromGradeScaleType grade scale type to convert grade from
 * @param toGradeScaleType grade scale type to convert grade to
 * @returns A scale's grade converted to a different scale's grade
 */
export const convertGrade = (
  fromGrade: string,
  fromGradeScaleType: GradeScalesTypes,
  toGradeScaleType: GradeScalesTypes
): string => {
  const fromScale = getScale(fromGradeScaleType)
  const toScale = getScale(toGradeScaleType)
  if (fromScale === null || toScale === null) {
    return ''
  }
  const sameConversionGroup: boolean = fromScale.conversionGroup === toScale.conversionGroup
  if (!sameConversionGroup) {
    console.warn(
      `Scale: ${fromScale.displayName} doesn't support converting to Scale: ${toScale.displayName}`
    )
    return ''
  }
  const toScore = fromScale.getScore(fromGrade)
  return toScale.getGrade(toScore)
}

export const isVScale = (grade: string): boolean => {
  const scale = scales[GradeScales.VSCALE]
  if (scale == null) {
    return false
  }
  return scale.isType(grade)
}
