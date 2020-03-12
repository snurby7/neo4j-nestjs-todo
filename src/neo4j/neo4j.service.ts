import { Inject, Injectable, Logger } from '@nestjs/common'
import { Driver, QueryResult } from 'neo4j-driver'
import RxSession from 'neo4j-driver/types/session-rx'
import { ExecuteStatement } from './interface/ExecuteStatement'

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name)

  /**
   * Simple getter to return an instance of an RxSession, this is up to the implementer to work out.
   * Implementer also will need to close the session when they are done with it you can use this pipe operator
   *
   * concat(rxSession.close())
   *
   * * Docs https://neo4j.com/docs/api/javascript-driver/current/class/src/session-rx.js~RxSession.html
   * * Session acccess Modes: https://neo4j.com/docs/driver-manual/1.7/sessions-transactions/#driver-transactions-access-mode
   *
   * @returns {RxSession}
   * @memberof Neo4jService
   */
  get rxSession(): RxSession {
    return this.neo4jDriver.rxSession()
  }

  constructor(@Inject('Neo4j') private readonly neo4jDriver: Driver) {}

  /**
   * Executes a given statement. The object must contain a statement and if you use
   * $myProps there must be a property in the props object that is keyed at myProps in order
   * for the find and replace to work.
   *
   * @deprecated Use the reactive API if you can
   * @param {ExecuteStatement} statementProps Object that contains a statement and optional props
   * @returns {Promise<QueryResult>}
   * @memberof Neo4jService
   */
  public async executeStatement(statementProps: ExecuteStatement): Promise<QueryResult> {
    const { statement, props } = statementProps
    this.logger.log(`Executing the following statement - ${statement}`)
    const session = this.neo4jDriver.session()
    const result = await session.run(statement, { ...props } ?? {})
    session.close()

    return result
  }
}
