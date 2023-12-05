import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Items = db.define(
    'Items',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        about: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        detailed_name: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
    },
    {
        timestamps: false
    }
)