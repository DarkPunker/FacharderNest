import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Sales } from "../../entities/sales.entity";
import { RelationshipService } from "./relationship.service";
import { IRelationship } from "./interfaces/relationship.interface";

@Injectable()
export class SalesNeoService{
  constructor(
    @Inject('Neo4j') private readonly neo4j,
    private readonly relationshipService: RelationshipService
  ){}

  public async createSales(sales: Sales): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Sales {
        id: '${sales.idSales}', 
        value_total: '${sales.value_total}', 
        date: '${sales.date}',
        type_voucher: '${sales.type_voucher}'
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

  public async addServiceToShoppingCart(idSales: number, idService: number): Promise<any> {
    const rela = {
      nodeA: { id: String(idSales), type: 'Sale' },
      nodeB: { id: String(idService), type: 'Service' },
      name: "CONTAINS_A"
    } as IRelationship;
    await this.relationshipService.createRelationship(rela);
  }

}