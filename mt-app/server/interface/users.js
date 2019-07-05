import Router from 'koa-router'
// 解决向多人发送验证码，a拿到a的验证码，b拿到b的验证码，
// 怎么知道a拿到的正确的验证码，b拿到的正确的验证码  （放在内存中不可取，内存会爆）
// 存在数据库中，检查 一一对应
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
// 因为最重要的是config的邮箱的东西，所以取名email
import Email from '../dbs/config'
import axios from './utils/axios'