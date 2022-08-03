const { Router } = require('express')

const MainDashboardRouter = Router()

MainDashboardRouter.route("/")
    .get(require('./dashboard.view'))

MainDashboardRouter.route("/submissions")
    .get(require('./submissions.view'))

module.exports = MainDashboardRouter