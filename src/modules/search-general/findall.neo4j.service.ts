import { FindAll } from './interface/findall.interface';
import { BadRequestException, All } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

const service = ["cod", "name", "description"];
const user = ["username", "firstname", "lastname"];
const team = ["name", "description"];
const sales = ["value_total", "date", "type_voucher"];
const project = ["projectname", "description", "date"];
const document = ["cod", "description", "type", "state"];
const category = ["name", "description"];
const nameNodo = ["Service", "User", "Team", "Sales", "Project", "Document", "Category"];

@Injectable()
export class SearchGeneralNeoService {
  constructor(
    @Inject('Neo4j') private readonly neo4j,
  ) { }

  public async imputData(dataSearch): Promise<any>{
    let query = "";
    let con = [];
    await Promise.all(
    nameNodo.map(async(element, i) => {
      switch (i) {
        case 0:
          query = this.concatQueryFind(service, dataSearch);
          break;
        case 1:
          query = this.concatQueryFind(user, dataSearch);
          break;
        case 2:
          query = this.concatQueryFind(team, dataSearch);
          break;
        case 3:
          query = this.concatQueryFind(sales, dataSearch);
          break;
        case 4:
          query = this.concatQueryFind(project, dataSearch);
          break;
        case 5:
          query = this.concatQueryFind(document, dataSearch);
          break;
        case 6:
          query = this.concatQueryFind(category, dataSearch);
          break;
      }
      const rela = {
        nodeA: { type: element },
        attrib: query,
      } as FindAll;
      let result = await this.findContains(rela);
      if(result.length > 0)
        con.push(result)
    })
    )
    return con;
  }

  public concatQueryFind(array, dataSearch): string {
    var concat = "a.";
    for (let index = 0; index < array.length; index++) {
      if (index == array.length - 1) {
        concat = concat + array[index] + " CONTAINS " + "'"+dataSearch+"'";
      } else {
        concat = concat + array[index] + " CONTAINS " + "'"+dataSearch+"'"+ " OR a.";
      }
    }
    return concat;
  }
  /* MATCH (s:Service) WHERE s.description CONTAINS 'sistema'OR RETURN s */
  public async findContains(rel: FindAll): Promise<any> {
    const session = this.neo4j.session();
    const query = `MATCH 
    (a: ${rel.nodeA.type})
    WHERE ${rel.attrib} 
    RETURN a`;
    console.log(query)
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