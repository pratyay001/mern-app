const asyncHandler = require('express-async-handler');

//@desc Get goals
//@route GET  /api/goals
//@access Private
const getGoals = asyncHandler(async(req,res)=> {
    res.status(200).json({message: 'Get goals'});
})
//@desc Create some goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req,res)=> {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please check your data');
    }
    res.status(200).json({message: 'set goals'});
})

//@desc update some goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req,res)=> {
    res.status(200).json({message: `updated the goal for ${req.params.id}`});
})
//@desc delete some goal
//@route Delete /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req,res)=> {
    res.status(200).json({message: `deleted the goal for ${req.params.id}`});
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal};