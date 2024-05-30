import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SessionData } from "express-session";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ISession } from "@repo/types";

import { Session } from './session.schema'
import { CreateSession } from './dto/create-session.dto'
import { DeleteSessionDto } from './dto/delete-session.dto'


@Injectable()
export class SessionService implements OnModuleInit {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<Session>,
  ) {}

  private readonly logger = new Logger(SessionService.name)
  private interval: NodeJS.Timeout | null
  private readonly intevalTime = 1000 * 60 * 5 // 5 min
  // private readonly intevalTime = 1000 * 5 // 5 sec

  onModuleInit() {
    this.startInterval()
  }


  private startInterval() {
    if (this.interval) return;
    
    const interval = setInterval(() => this.prune(), this.intevalTime)
    this.interval = interval
  }

  private stopInterval() {
    if (!this.interval) return;

    clearInterval(this.interval)
    this.interval = null
  }

  private async prune() {
    const sessions = await this.sessionModel.find()
    if (!sessions.length) {
      this.logger.log(`Prune at ${new Date().toLocaleTimeString()}. Deleted 0 sessions.`)
      return
    }

    let deletedCount = 0
    sessions.forEach(async session => {
      const { sid, expiresAt } = session
      if ((new Date(expiresAt)).valueOf() < Date.now()) {
        const foundSession = await this.getOneBySId(sid)
        if (foundSession) {
          await this.deleteOne({ sid })
          deletedCount += 1
        }
      }
    })

    this.logger.log(`Prune at ${new Date().toLocaleTimeString()}. Deleted ${deletedCount} sessions.`)
  }



  async createOne({
    sid,
    userId,
    data,
    expiresAt,
  }: CreateSession): Promise<Session> {
    return this.sessionModel.create({
      sid,
      userId,
      data,
      expiresAt,
    })
  }

  async getOneBySId(sid: ISession['sid']) {
    return this.sessionModel.findOne({ sid })
  }

  async touch(sid: ISession['sid'], session: SessionData): Promise<Session | null> {
    const expiresAt = session.cookie.expires.toJSON()

    const sessionDoc = await this.getOneBySId(sid)

    if (!sessionDoc) return null
    
    await sessionDoc.updateOne({
      expiresAt,
      data: JSON.stringify(session)
    })

    return sessionDoc
  }

  async deleteOne(query: DeleteSessionDto): Promise<boolean> {
    try {
      const deleteResult = await this.sessionModel.deleteMany(query)
      
      if (!deleteResult.deletedCount) return false

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async deleteAllByUserId(userId: ObjectId) {
    try {
      await this.sessionModel.deleteMany({
        userId,
      })
    } catch (error) {
      console.log(error)     
    }
  }

  async deleteAll() {
    try {
      await this.sessionModel.deleteMany()
    } catch (error) {
      console.log(error)
    }
  }
}