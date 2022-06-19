const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');

//@desc Get goals
//@route GET  /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals);
})
//@desc Create some goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please check your data');
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal);
})

//@desc update some goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error('Please select one id');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedGoal);
})
//@desc delete some goal
//@route Delete /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error('Please select one id');
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    //also can use Goal.remove()

    res.status(200).json({ id: req.params.id });
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };