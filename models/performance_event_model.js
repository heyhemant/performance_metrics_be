const Sequelize = require("sequelize");
const { sequelize } = require("../database_connection");

const PerformanceEvent = sequelize.define(
    "Performance_Event",
    {
        tracker: { type: Sequelize.STRING, allowNull: false },
        duration: { type: Sequelize.INTEGER, allowNull: false },
        date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        app_version: { type: Sequelize.STRING, allowNull: false },
    },
    {
        tableName: "performance_events",
        timestamps: false,
    }
);

module.exports = PerformanceEvent;
