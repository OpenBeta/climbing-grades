import { getScoreForGrade } from '..'

describe('YDS', () => {
  test('5.9 > 5.8', () => {
    expect(getScoreForGrade('5.9')).toBeGreaterThan(getScoreForGrade('5.8'))
  })

  test('5.10b > 5.10a', () => {
    expect(getScoreForGrade('5.10b')).toBeGreaterThan(getScoreForGrade('5.10a'))
  })

  test('5.11 > 5.10+', () => {
    expect(getScoreForGrade('5.11')).toBeGreaterThan(getScoreForGrade('5.10+'))
  })
})

describe('V', () => {
  test('v5 > V3', () => {
    expect(getScoreForGrade('v5')).toBeGreaterThan(getScoreForGrade('V3'))
  })

  test('v2-3 > V2', () => {
    expect(getScoreForGrade('v2-3')).toBeGreaterThan(getScoreForGrade('V2'))
  })

  test('v20 > V20+', () => {
    expect(getScoreForGrade('V20+')).toBeGreaterThan(getScoreForGrade('V20'))
  })
})
