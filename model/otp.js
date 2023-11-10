import { DATE, DataTypes } from "sequelize";
import db from "../config/db.js";
import { User } from "./user.js";

export const otp = db.define(
    'Otp',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        passcode: {
            type: DataTypes.CHAR,
            allowNull: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        }
    },
    { timestamps: true }
)

otp.belongsTo(User, { foreignKey: "user_id" })
User.hasOne(otp, { foreignKey: "user_id" })