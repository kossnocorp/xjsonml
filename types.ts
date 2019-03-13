export type Node = [string, NodeAttributes, NodeChildren]

export interface NodeAttributes {
  [key: string]: string
}

export interface NodeChildren extends Array<Node | string> {}
