 
import neo4j from "neo4j-driver";

export const Neo4jProvider = {
  provide: "Neo4j",
  useFactory: () => neo4j.driver("bolt://ec2-18-222-143-45.us-east-2.compute.amazonaws.com", neo4j.auth.basic("neo4j","f606b940a3ef308d61277b8773b688c38415fd"))
 }