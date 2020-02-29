import { Module } from "@nestjs/common";
import { UserNeoService } from "./user.neo4j.service";
import { CommonModule } from "src/common/common.module";
import { CategoryNeoService } from "./category.neo4j.service";
import { DocumentNeoService } from "./document.neo4j.service";
import { RoleNeoService } from "./role.neo4j.service";
import { RelationshipService } from "./relationship.service";
import { ProjectNeoService } from "./project.neo4j.service";
import { SalesNeoService } from "./sales.neo4j.service";
import { TeamNeoService } from "./team.neo4j.service";
import { ServiceNeoService } from "./service.neo4j.service";

const SERVICES = [
  UserNeoService, 
  CategoryNeoService, 
  DocumentNeoService, 
  RoleNeoService, 
  RelationshipService, 
  ProjectNeoService,
  SalesNeoService,
  TeamNeoService,
  UserNeoService,
  ServiceNeoService
];

@Module({
  imports: [CommonModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class NeoModule{}