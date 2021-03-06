
import { MongoHelper } from '../infra/db/mongodb/helpers/mongoHelper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log(`Server running at http://127.0.0.1:${env.port}`)
  })
}).catch(console.error)
