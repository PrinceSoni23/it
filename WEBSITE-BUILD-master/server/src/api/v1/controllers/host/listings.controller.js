import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Listing } from "../../models/host/listing.model.js";
import { Host } from "../../models/host/host.model.js";
import { Reservation } from "../../models/host/reservation.model.js";

const allListings = asyncHandler( async(req, res) => {
    console.log("all listings")
    try{
        const listings = await Listing.find()
        return res.status(200).json(
            new ApiResponse(200, listings, "Listings fetched successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching the listings")
    }
});

const getListingbypartId = asyncHandler( async(req, res) => {
    const {listingId} = req.params
    try{
        const listing = await Listing.findById(listingId)
        return res.status(200).json(
            new ApiResponse(200, listing, "Listing fetched successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching the listing")
    }
});

const getListingsByReservations = asyncHandler( async(req, res) => {
    const {city, checkIn, checkOut } = req.body

    // console.log("location: ", location,"checkIn and CheckOut: ", checkIn, checkOut) 
     

    if(!city || !checkIn || !checkOut){
        throw new ApiError(400, "Please provide location, guests, check in and check out time")
    }

    // const locationArr = location.split(',');
    // const city = locationArr[0].trim();
    // const country = locationArr[1].trim();
    try{
        
    const existingReservations = await Reservation.find({
        status: "approved",
        $or: [
            {checkIn: {$gte: checkIn, $lte: checkOut}},
            {checkOut: {$gte: checkIn, $lte: checkOut}},
            {checkIn: {$lte: checkIn}, checkOut: {$gte: checkOut}}
        ]
    })

    console.log("Existing Reservations: ", existingReservations)

    //Exclude those listings who are already reserved

    const listings = await Listing.find({
        _id: {$nin: existingReservations.map(reservation => reservation.listId)},
        city,
        // country
    });

    console.log("Listings: ", listings)
    
        return res.status(200).json(
            new ApiResponse(200, listings, "Listings fetched successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching the listings")
    }
});

const createListing = asyncHandler( async(req, res) => {

    const hostId = req.hostData._id
    console.log("for creating listing HostId",hostId);
    if(!hostId){
        throw new ApiError(401, "Unauthorized request")
    }

    const {
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount
    } = req.body
    console.log("Host ID: ", hostId, req.hostData._id)
    
    if([ type, streetAddress, aptSuite, city, province, country].some(field => field?.trim() === "")){
        throw new ApiError(400, "All the fields are required")
    }
    if(category.some(field => field?.trim() === "")) {
        throw new ApiError(400, "Invalid Empty field in category")
    }
    if(!guestCount || !bedroomCount || !bedCount || !bathroomCount){
        throw new ApiError(400, "All the fields are required")
    }

    try{
        const listing = await Listing.create({
            hostId,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount
        })
        return res.status(200).json(
            new ApiResponse(200, listing, "Property registered successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400,error.message || "Something went wrong while creating the listing")
    }
})

const getListings = asyncHandler( async(req, res) => {
    const hostId = req.hostData._id
    if(!hostId){
        throw new ApiError(401, "Unauthorized request")
    }
    try{
        const listings = await Listing.find({hostId})
        return res.status(200).json(
            new ApiResponse(200, listings, "Listings fetched successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching the listings")
    }
})

const getPaginatedListings = asyncHandler( async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const listings = await Listing.find()
            .skip(skip)
            .limit(limit);

        const total = await Listing.countDocuments();

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalListings: total,
            listings,
        });
    }catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

const getListingById = asyncHandler( async(req, res) => {
    const hostId = req.hostData._id
    const {listId} = req.params
    console.log("listId: ", listId, req.params)
    if(!hostId){
        throw new ApiError(401, "Unauthorized request")
    }
    try{
        const listing = await Listing.findById(listId)
        if(!listing){
            throw new ApiError(404, "Listing not found")
        }
        return res.status(200).json(
            new ApiResponse(200, listing, "Listing fetched successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching the listing")
    }
})

const updateListing = asyncHandler( async(req, res) => {
    const hostId = req.hostData._id
    console.log("for update listing Host ID: ", hostId)
    if(!hostId){
        throw new ApiError(401, "Unauthorized request")
    }
    const {listId} = req.params
    console.log("listId: ", listId);
    //check if the correct host is trying to update the listing 
    const listing = await Listing.findOne({ hostId, _id: listId });

    if (!listing) {
        throw new ApiError(401, "You are not authorized to perform that action");
    }
    console.log("Listing: ", listing)

    const { type, streetAddress, aptSuite, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount } = req.body

    if([type, streetAddress, aptSuite, city, province, country, ].some(field => field?.trim() === "")){
        throw new ApiError(400, "All the fields are required")
    }
    if(!guestCount || !bedroomCount || !bedCount || !bathroomCount){
        throw new ApiError(400, "All the fields are required")
    }
        listing.type = type;
        listing.streetAddress = streetAddress;
        listing.aptSuite = aptSuite;
        listing.city = city;
        listing.province = province;
        listing.country = country;
        listing.guestCount = guestCount;
        listing.bedroomCount = bedroomCount;
        listing.bedCount = bedCount;
        listing.bathroomCount = bathroomCount;
    try{
        await listing.save();
        return res.status(200).json(
            new ApiResponse(200, listing, "Property updated successfully")
        )
    }catch(error){
        throw new ApiError(400, error.message || "Something went wrong while updating the listing")
    }
})

const updatePhotos = asyncHandler( async(req, res) => {
    const hostId = req.hostData._id
    const {listId} = req.params
    console.log("UpdatePhotos for listing, HostId: ",hostId," listId",listId)
    
    if(!hostId || !listId){
        throw new ApiError(401, "Unauthorized request")
    }
    
    const listing = await Listing.findOne({hostId, _id: listId})

    if(!listing){
        throw new ApiError(401, "You are not authorized to perform that action")
    }

    const { facilities, title, description, highlight, highlightDesc, price} = req.body
            
    console.log("facilities: ", facilities, typeof(facilities))
    const facilitiesArray = Array.isArray(facilities) ? facilities : facilities.split(',').map(item => item.trim());
    
    if([ title, description, highlight, highlightDesc, price].some(field => field?.trim() === "")){
        throw new ApiError(400, "All the fields are required")
    }
    console.log("Files: ", req.files);
    const photosPath = req.files.listingPhotoPaths?.map(file => file.path);

    if(!photosPath){
        throw new ApiError(400, "Please upload photos")
    }
            listing.listingPhotoPaths = photosPath
            listing.facilities=facilitiesArray;
            listing.title = title;
            listing.description = description;
            listing.highlight = highlight;
            listing.highlightDesc = highlightDesc;
            listing.price = price;
    try{
        await listing.save();
        return res.status(200).json(
            new ApiResponse(200, listing, "Property photos updated successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while updating the listing photos")
    }
})

const deleteListing = asyncHandler( async(req, res) => {
    console.log("deleting a listing");
    const hostId = req.hostData._id
    const {listId} = req.params

    if(!hostId || !listId){
        throw new ApiError(401, "Unauthorized request")
    }

    const listByHostId = await Listing.findOne({hostId, _id: listId})
    console.log("for deleting listing listByHostId: ", !listByHostId)

    if(!listByHostId){
        throw new ApiError(401, "You are not authorized to perform that action")
    }

    try{
        const listing = await Listing.findByIdAndDelete(listId);
        return res.status(200).json(
            new ApiResponse(200, listing, "Property deleted successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, error.message || "Something went wrong while deleting the listing")
    }
})

export { 
        getListingbypartId,
        createListing,
        getListingsByReservations,
        allListings,
        getListings,
        getPaginatedListings,
        getListingById,
        updateListing,
        updatePhotos,
        deleteListing
}

