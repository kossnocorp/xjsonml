import { XNodeProps } from '../types'

export type PackedXNode =
  | [string, XNodeProps, ...Array<unknown>]
  | [string, XNodeProps]
  | [string, ...Array<unknown>]
  | [string]

export type PackedXNodes = Array<string | PackedXNode>
