import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../../entities/user.entity";
import { Service } from "../../entities/service.entity";
import { Category } from "../../entities/category.entity";
import { Team } from "../../entities/team.entity";
import { Project } from "../../entities/project.entity";
import { Role } from "../../entities/rol.entity";
import { Document } from "../../entities/document.entity";
import { Sales } from "../../entities/sales.entity";
import { InvoiceDetail } from "src/entities/invoice_detail.entity";


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  
  constructor(private readonly config: ConfigService) {}

   
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.getOrmConfig(),
      entities: [
        User, 
        Role, 
        Team, 
        Project, 
        Document,
        Service, 
        Category,
        Sales,
        InvoiceDetail
      ],
    };
  }

  getOrmConfig(): any {
    return {
      type: this.config.get('database.DB_TYPE'),
      host: this.config.get('database.DB_HOST'),
      port: this.config.get('database.DB_PORT'),
      username: this.config.get('database.DB_USERNAME'),
      password: this.config.get('database.DB_PASSWORD'),
      database: this.config.get('database.DB_DATABASE'),
      synchronize: this.config.get('database.DB_DATABASE'),
    }
  } 
}