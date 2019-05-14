export type XNode = [string, XNodeProps, XNodes]

export interface XNodeProps {
  [key: string]: string
}

export interface XInstruction {
  data: string
}

export type XNodeChild = XNode | XInstruction | string

export interface XNodes extends Array<XNodeChild> {}
