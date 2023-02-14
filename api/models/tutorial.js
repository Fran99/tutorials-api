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
      validate: {
        notNull: {
          msg: 'Please enter a title',
        },
      },
    },
    videoURL: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a video URL',
        },
        isUrl: {
          msg: 'Please enter a valid URL',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isAlphanumeric: {
          msg: 'Please enter a alphanumeric values only',
        },
      },
    },
    publishedStatus: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: 'draft',
      validate: {
        isIn: [['draft', 'pending', 'published']],
      },
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Tutorial',
    tableName: 'tutorials',
  });
  return Tutorial;
};
