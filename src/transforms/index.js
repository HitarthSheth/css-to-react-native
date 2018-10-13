import { regExpToken, tokens } from '../tokenTypes'
import boxShadow from './boxShadow'
import flex from './flex'
import font from './font'
import fontFamily from './fontFamily'
import textShadow from './textShadow'
import textDecoration from './textDecoration'
import textDecorationLine from './textDecorationLine'
import transform from './transform'
import { directionFactory, anyOrderFactory, shadowOffsetFactory } from './util'

const {
  IDENT,
  WORD,
  COLOR,
  LENGTH,
  UNSUPPORTED_LENGTH_UNIT,
  PERCENT,
  AUTO,
} = tokens

const background = tokenStream => ({
  $merge: { backgroundColor: tokenStream.expect(COLOR) },
})

const createBorderFactory = (direction = '') =>
  anyOrderFactory({
    [`border${direction}Width`]: {
      tokens: [LENGTH, UNSUPPORTED_LENGTH_UNIT],
      default: 1,
    },
    [`border${direction}Color`]: {
      tokens: [COLOR],
      default: 'black',
    },
    [`border${direction}Style`]: {
      tokens: [regExpToken(/^(solid|dashed|dotted)$/)],
      default: 'solid',
    },
  })

const border = createBorderFactory()
const borderTop = createBorderFactory('Top')
const borderBottom = createBorderFactory('Bottom')
const borderLeft = createBorderFactory('Left')
const borderRight = createBorderFactory('Right')

const borderColor = directionFactory({
  types: [WORD],
  prefix: 'border',
  suffix: 'Color',
})
const borderRadius = directionFactory({
  directions: ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'],
  prefix: 'border',
  suffix: 'Radius',
})
const borderWidth = directionFactory({ prefix: 'border', suffix: 'Width' })
const margin = directionFactory({
  types: [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT, AUTO],
  prefix: 'margin',
})
const padding = directionFactory({ prefix: 'padding' })
const flexFlow = anyOrderFactory({
  flexWrap: {
    tokens: [regExpToken(/(nowrap|wrap|wrap-reverse)/)],
    default: 'nowrap',
  },
  flexDirection: {
    tokens: [regExpToken(/(row|row-reverse|column|column-reverse)/)],
    default: 'row',
  },
})
const fontVariant = tokenStream => [tokenStream.expect(IDENT)]
const fontWeight = tokenStream => tokenStream.expect(WORD) // Also match numbers as strings
const shadowOffset = shadowOffsetFactory()
const textShadowOffset = shadowOffsetFactory()

export default {
  background,
  border,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  flex,
  flexFlow,
  font,
  fontFamily,
  fontVariant,
  fontWeight,
  margin,
  padding,
  shadowOffset,
  textShadow,
  textShadowOffset,
  textDecoration,
  textDecorationLine,
  transform,
}
