import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Provider } from '../auth/providers';
import { Model } from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: Provider,
    required: false,
  },
  providerId: {
    type: String,
    required: false,
  },
});

UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function(next) {
  const user = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(attempt, callback) {
  const user = this;

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.findOneByProviderAndId = async (
  provider: Provider,
  providerId: string,
): Model<User> => {
  return await this.findOne({
    provider,
    providerId,
  });
};
