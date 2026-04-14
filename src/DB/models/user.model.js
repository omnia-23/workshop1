import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    f_name: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
    },
    l_name: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is // required"],
      trim: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "age must be greater than 18"],
      // validate: {
      //   validator: function (value) {
      //     return value > 18;
      //   },
      //   message: "age must be greater than 18",
      // },
    },
    skills: [String],
    address: {
      city: String,
      street: String,
    },
    is_account_verified: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    strict: true,
    versionKey: "__v", //_v
    collection: "users",
    // capped: {
    //   size: 1024,
    // },

    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.index({ email: 1, phone: 1 }, { unique: true });

userSchema.virtual("full_name").get(function () {
  return this.f_name + "  " + this.l_name;
});

userSchema.pre(/^find/, function (next) {
  //   this.where({ deleted_at: null });
});

const User = mongoose.model("user", userSchema);

export default User;
