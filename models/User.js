import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: { type: String, },
    loggedIn: { type: Number, default: 0 },
    updated_at:{type: Date}

   
}, { timestamps: true })
userSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
const User = mongoose.model('User', userSchema);
export default User

