import db from "../config/db.js"
import { DataTypes } from "sequelize"

export const User = db.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR,
            unique: true
        },
        password: {
            type: DataTypes.CHAR,
        }
    },
    { timestamps: false }
)