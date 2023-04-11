import VScale from './v'
import YosemiteDecimal from './yds'
import Font from './font'
import French from './french'
import UIAA from './uiaa'
import Ewbank from './ewbank'
import Aid from './aid'
import CleanAid from './cleanaid'
import GradeScale, { GradeScales } from '../GradeScale'
export { VScale, Font, YosemiteDecimal, French, UIAA, Ewbank, Aid, CleanAid }

export interface Boulder {
  score: number
  v: string
  font: string
  band: 'beginner' | 'intermediate' | 'elite' | 'advanced'
}

export interface Route {
  score: number
  yds: string
  french: string
  uiaa: string
  ewbank: string
  band: 'beginner' | 'intermediate' | 'elite' | 'experienced'
}

export interface AidRoute {
  score: number
  aid: string
  cleanaid: string
}

export const scales: Record<typeof GradeScales[keyof typeof GradeScales], GradeScale | null> = {
  [GradeScales.VSCALE]: VScale,
  [GradeScales.YDS]: YosemiteDecimal,
  [GradeScales.FONT]: Font,
  [GradeScales.FRENCH]: French,
  [GradeScales.UIAA]: UIAA,
  [GradeScales.EWBANK]: Ewbank,
  [GradeScales.AID]: Aid,
  [GradeScales.CLEANAID]: CleanAid
}
