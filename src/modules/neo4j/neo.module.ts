import { Module } from "@nestjs/common";
import { UserNeoService } from "./user.neo4j.service";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [CommonModule],
  providers: [UserNeoService],
  exports: [UserNeoService]
})
export class NeoModule{}