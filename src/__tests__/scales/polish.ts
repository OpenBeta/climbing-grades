// import { GradeBands } from '../../GradeBands'
import { Polish } from '../../scales'

describe('Polish', () => {
  describe('isPolish', () => {
    test('VI is a valid grade', () => {
      expect(Polish.isType('VI')).toBe(true)
    })
    test('asd is not a valid grade', () => {
      expect(Polish.isType('asd')).toBe(false)
    })
  })
  // describe('Get Score', () => {
  //   test('9a > 5c', () => {
  //     const lowGrade = Polish.getScore('5c')
  //     const highGrade = Polish.getScore('9a')
  //     expect(highGrade[0]).toBeGreaterThan(lowGrade[1])
  //   })

  //   test('1c > 1a+', () => {
  //     const highGrade = Polish.getScore('1c')
  //     const lowGrade = Polish.getScore('1a+')
  //     expect(highGrade[0]).toBeGreaterThan(lowGrade[1])
  //   })

  //   test('1a/1a+ > 1a, one grade away', () => {
  //     const highGrade = Polish.getScore('1a/1a+')
  //     const lowGrade = Polish.getScore('1a')
  //     expect(highGrade[0] < lowGrade[1] && highGrade[0] > lowGrade[0])
  //     expect(highGrade[1]).toBeGreaterThan(lowGrade[1])
  //   })

  //   test('4a > 3c+/4a, one grade away', () => {
  //     const highGrade = Polish.getScore('4a')
  //     const lowGrade = Polish.getScore('3c+/4a')
  //     expect(highGrade[0] < lowGrade[1] && highGrade[0] > lowGrade[0])
  //     expect(highGrade[1]).toBeGreaterThan(lowGrade[1])
  //   })
  // })

  // describe('invalid grade format', () => {
  //   jest.spyOn(console, 'warn').mockImplementation()
  //   beforeEach(() => {
  //     jest.clearAllMocks()
  //   })
  //   test('extra plus modifier', () => {
  //     const invalidGrade = Polish.getScore('5a++')
  //     expect(console.warn).toHaveBeenCalledWith('Unexpected grade format: 5a++ for grade scale polish')
  //     expect(invalidGrade).toEqual(-1)
  //   })
  //   test('invalid minus modifier', () => {
  //     const invalidGrade = Polish.getScore('5a-')
  //     expect(console.warn).toHaveBeenCalledWith('Unexpected grade format: 5a- for grade scale polish')
  //     expect(invalidGrade).toEqual(-1)
  //   })
  //   test('extra slash grade', () => {
  //     const invalidGrade = Polish.getScore('5a/5a+/5b+')
  //     expect(console.warn).toHaveBeenCalledWith('Unexpected grade format: 5a/5a+/5b+ for grade scale polish')
  //     expect(invalidGrade).toEqual(-1)
  //   })
  //   test('extra slash', () => {
  //     const invalidGrade = Polish.getScore('5a/')
  //     expect(console.warn).toHaveBeenCalledWith('Unexpected grade format: 5a/ for grade scale polish')
  //     expect(invalidGrade).toEqual(-1)
  //   })
  //   test('not Polish scale', () => {
  //     const invalidGrade = Polish.getScore('v11')
  //     expect(console.warn).toHaveBeenCalledWith('Unexpected grade format: v11 for grade scale polish')
  //     expect(invalidGrade).toEqual(-1)
  //   })
  // })

  // describe('Get Grade', () => {
  //   test('bottom of range', () => {
  //     expect(Polish.getGrade(0)).toBe('1a')
  //   })

  //   test('top of range', () => {
  //     expect(Polish.getGrade(1000)).toBe('9c+')
  //   })

  //   test('single score provided', () => {
  //     expect(Polish.getGrade(34)).toBe('3c+')
  //     expect(Polish.getGrade(34.5)).toBe('3c+')
  //     expect(Polish.getGrade(35)).toBe('3c+')
  //   })
  //   test('range of scores provided', () => {
  //     expect(Polish.getGrade([0.5, 2])).toBe('1a/1a+')
  //     expect(Polish.getGrade([8, 12])).toBe('1c/2a')
  //     expect(Polish.getGrade([16, 17])).toBe('2b')
  //   })
  // })

  // describe('Get Grade Band', () => {
  //   test('gets Gradeband', () => {
  //     expect(Polish.getGradeBand('1a')).toEqual(GradeBands.BEGINNER)
  //     expect(Polish.getGradeBand('9c+')).toEqual(GradeBands.EXPERT)
  //   })
  // })
})
