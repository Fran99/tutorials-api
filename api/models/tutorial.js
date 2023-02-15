const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    parse() {
      return {
        id: this.id,
        title: this.title,
        videoURL: this.videoURL,
        description: this.description,
        publishedStatus: this.publishedStatus,
      };
    }
  }
  Tutorial.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoURL: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedStatus: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: 'draft',
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Tutorial',
    tableName: 'tutorials',
  });
  return Tutorial;
};
