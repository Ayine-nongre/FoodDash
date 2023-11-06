import dotenv  from "dotenv"
import { Sequelize } from 'sequelize'

dotenv.config()

const db = new Sequelize(
  'foodDash',
  process.env.username,
  process.env.password,
  {
    dialect: "mysql",
    host: 'localhost',
    port: 3306,
  }
)

export default db