const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const create = async (req, res) => {
    const { title, description, published } = req.body;

    if (!title) {
        res.status(400).end({
            message: 'The title can not be emptied'
        });
        return;
    }

    const tutorial = { title, description, published };
    try {
        const newTutorial = await Tutorial.create(tutorial);
        res.send(newTutorial);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const findAll = async (req, res) => {
    const { title } = req.query;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    try {
        const tutorials = await Tutorial.findAll({
            where: condition
        });
        if (tutorials) {
            res.send(tutorials);
        } else {
            throw Error('Can not get tutorials');
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

const findOne = async (req, res) => {
    const { id } = req.params;
    
    try {
        const tutorial = await Tutorial.findByPk(id);
        if (tutorial) {
            return res.send(tutorial);
        } else {
            throw Error('Tutorial can not be found');
        }
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}; 

const update = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Tutorial.update(req.body, {
            where: { id }
        });
        if (result[0] == 1) return res.send({ message: 'Tutorial is updated succesfully' });
        return res.status(404).send({ message: 'The tutorial could not be updated due to missing title or something else' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

const deleteOne = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Tutorial.destroy({
            where: { id }
        });
        if (result[0] == 0) {
            return res.send({ message: 'Tutorial is removed succesfully' });
        } else {
            return res.status(404).send({ message: 'The tutorial could not be removed' });
        }
    } catch (error) {
        res.status(500).end({ error: error.message });
    };
};

const deleteAll = async (req, res) => {
    try {
        const numOfTutorialDeleted = await Tutorial.destroy({
            where: {},
            truncate: false
        });
        res.send(`${numOfTutorialDeleted} tutorials removed`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

const findAllPublished = async (req, res) => { 
    try {
        const tutorials = await Tutorial.findAll({
            where: { published: true }
        });
        res.send(tutorials);
    } catch (error) {
        res.status(500).send({ error: error.messsage });
    };
};

module.exports = { create, findAll, findOne, update, deleteOne, deleteAll, findAllPublished };