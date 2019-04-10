export type XNode = [string, XNodeProps, XNodes]

export interface XNodeProps {
  [key: string]: string
}

export interface XInstruction {
  data: string
}

export interface XNodes extends Array<XNode | XInstruction | string> {}
