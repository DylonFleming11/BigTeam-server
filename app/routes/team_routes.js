// require express library and Mongoose
const express = require('express')
// const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// require event model
const Team = require('./../models/team.js')

// require handle404 and requireOwnership
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// removes the blank lines.
// const removeBlanks = require('../../lib/remove_blank_fields')

// create team
router.post('/team', requireToken, (req, res, next) => {
  req.body.team.owner = req.user._id
  Team.create(req.body.team)
    .then(events => res.status(201).json(events))
    .catch(next)
})

// delete/destroy team
router.delete('/team/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Team.findById(id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      // })
      // .then(events => {
      team.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// index team
router.get('/team', requireToken, (req, res, next) => {
  Team.find({ owner: req.user.id })
    .populate('owner')
    .then(team => res.status(201).json(team))
    .catch(next)
})

// show team
router.get('/team/:id', requireToken, (req, res, next) => {
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => requireOwnership(req, team))
    .then(team => res.json(team))
    .catch(next)
})

// patch/update team
router.patch('/team/:id', requireToken, (req, res, next) => {
  // IMPORTANT! We need to remove the owner, to protect the data.
  delete req.body.team.owner
  // const teamId = req.params.id
  // const teamData = req.body.team
  Team.findById(req.params.id)
    .then(handle404)
    .then(team => {
      requireOwnership(req, team)
      // })
      // .then(team => {
      return team.updateOne(req.body.team)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
