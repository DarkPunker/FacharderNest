import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Category } from "../../entities/category.entity";

@Injectable()
export class CategoryNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createCategory(category: Category): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Category {
        id: '${category.idCategory}', 
        name: '${category.name}', 
        description: '${category.description}'
      }) return u
    `;
    return session
        .run(query)
        .then((result) => {
        session.close();
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

}