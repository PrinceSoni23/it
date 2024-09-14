import mongoose, { Schema } from "mongoose";

const ListingSchema = new Schema({
    hostId: {
        type: Schema.Types.ObjectId,
        ref: "Host",
        required: true
    },

    //------------STEP 1----------------
    category: {
        type: [String],
        enum: ["Beachfront", "Iconic cities", "Mountain", "Rural", "Ski-in/out", "Urban", "Village", "Waterfront",
            "Countryside", "Desert", "Camping", "Island", "Arctic", "Lakefront", "River", "Seaside", "Valley",
            "Windmills", "Other"],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    aptSuite: {
        type: String,
        required: false, //(If Applicable)
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    guestCount: {
        type: Number,
        required: true,
    },
    bedroomCount: {
        type: Number,
        required: true,
    },
    bedCount: {
        type: Number,
        required: true,
    },
    bathroomCount: {
        type: Number,
        required: true,
    },
    facilities: {
        type: [String],
        enum: ["Bath tub", "Personal care products", "Outdoor shower", "Washer", "Dryer", "Hangers", "Iron", "TV", "Dedicated workspace", "Air Conditioning", "Heating", "Security cameras", "Fire extinguisher","First Aid", "Wifi", "Cooking set", "Refrigerator", "Microwave", "Stove", "Barbecue grill", "Outdoor dining area", "Private patio or Balcony", "Camp fire", "Garden", "Free parking", "Self check-in", "Pet allowed"]
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs

    //------------STEP 2----------------
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    highlight: {
        type: String,
        required: false
    },
    highlightDesc: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
    }
},
    { timestamps: true }
);

ListingSchema.pre('findOneAndDelete', async function (next) {
    try {
        const Reservation = mongoose.model('Reservation');
        console.log("pre remove Reservation for listing:", Reservation, this.getQuery()['_id']);
        await Reservation.deleteMany({ listId: this.getQuery()['_id'] });
        next();

    } catch (error) {
        console.log("Error:", error);
    }
});

export const Listing = mongoose.model('Listing', ListingSchema);
