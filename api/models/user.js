const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static attributes() {
      return ['id', 'name', 'lastname'];
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name',
        },
      },
    },
    lastname: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your lastname',
        },
      },
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter your email',
        },
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      validate: {
        isBoolean: {
          msg: 'This should be a boolean value',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a password',
        },
      },
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
