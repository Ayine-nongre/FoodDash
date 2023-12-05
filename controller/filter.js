import { Op } from "sequelize"
import { Items } from "../model/item.js"

export const filter = async (req, res) => {
    const { min, max, category } = req.query
    
    const items = await Items.findAll({ where: { 
        price: {[Op.and]: { [Op.lte]: max, [Op.gte]: min }},
        category: category === 'All' ? ['Snack', 'Fast food', 'Drink'] : category
    }}).catch(err => console.log(err))

    if (!items) return res.status(500).json({ message: "Internal server error"})

    const queryItems = []
    items.map(item => {
        queryItems.push(item.dataValues)
    })

    res.status(200).json({
        message: "Success",
        items: queryItems
    })
}

export const search = async (req, res) => {
    const { query } = req.query

    if (!query || query === '') return res.status(400).json({ message: "Empty query"})

    const items = await Items.findAll({ where: { 
        [Op.or]: {
            item_name: {[Op.substring]: query},
            category: {[Op.substring]: query},
            detailed_name: {[Op.substring]: query}
        } 
    }})

    const queryItems = []
    items.map(item => {
        queryItems.push(item.dataValues)
    })

    res.status(200).json({
        message: "Success",
        items: queryItems
    })
}