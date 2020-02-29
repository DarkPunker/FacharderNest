import { Module } from "@nestjs/common";
import { UserNeoService } from "./user.neo4j.service";

@Module({
  imports: [],
  providers: [UserNeoService],
  exports: [UserNeoService]
})
export class NeoModule{}