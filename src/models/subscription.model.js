import mongoose from "mongoose";

const SubscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription Name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  price: {
    type: Number,
    required: [true, "Subscription Price is required"],
    min: [0, "Price cannot be negative"]
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
    enum: ['USD', 'EUR', 'GBP', 'PHP', 'JPY'],
    default: 'USD', 
    trim: true,
    uppercase: true,
  },
  frequency: {
    type: String,
    required: [true, "Subscription Frequency is required"],
    enum: ['daily','weekly','monthly', 'yearly'],
    default: 'monthly',
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Subscription Category is required"],
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic',
    trim: true,
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment Method is required"],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Subscription Status is required"],
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is required"],
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start date cannot be in the future'
    }
  },
  renewalDate: {
    type: Date,
    required: [true, "Start Date is required"],
    validate: {
      validator: function(value){ return value > this.startDate;},
      message: 'Renewal date must be after the start date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User ID is required"],
    index: true
  }
},{
  timestamps: true
});

SubscriptionSchema.pre('save', function(next) {
  if(!this.renewalDate){
    const renewalPeriods ={
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency])
  }

  if(this.renewalDate < new Date()){
    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;