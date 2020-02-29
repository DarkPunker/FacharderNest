import { NeoNode } from "./node.interface";

export interface IRelationship{
  nodeA: NeoNode;
  nodeB: NeoNode;
  name?: string;
}