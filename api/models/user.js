const {
  Model,
} = require('sequelize');
const bcrypt = require('bcryptjs');

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

    parse() {
      return {
        id: this.id,
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        isAdmin: this.isAdmin,
      };
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
        isAlphanumeric: {
          msg: 'Please enter a alphanumeric values only',
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
        isAlphanumeric: {
          msg: 'Please enter alphanumeric values only',
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
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
