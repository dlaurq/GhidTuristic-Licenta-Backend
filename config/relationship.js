module.exports = () => {
    const {Country, County, Image, Location, Place, PlaceReviews, PlacesToVisit, PlacesVisited, Review, User} = require('./ModelsConfig')
    console.log('aaa')
    //One to One Relations
    User.hasOne(Image);
    Image.belongsTo(User);

    //One to Many relations
    ////Country
    Country.hasMany(County);
    County.belongsTo(Country);
    ////County
    County.hasMany(Location);
    Location.belongsTo(County);
    ////Location
    Location.hasMany(User);
    Location.hasMany(Place);
    User.belongsTo(Location);
    Place.belongsTo(Location);
    ////Place
    Place.hasMany(Image);
    Image.belongsTo(Place);
    ////Review
    Review.hasMany(Image);
    Image.belongsTo(Review);

    //Super Many to Many relations
    ////User and Place
    //////PlacesToVisit
    User.belongsToMany(Place,{through: PlacesToVisit});
    Place.belongsToMany(User,{through: PlacesToVisit});
    User.hasMany(PlacesToVisit);
    PlacesToVisit.belongsTo(User);
    Place.hasMany(PlacesToVisit);
    PlacesToVisit.belongsTo(Place);
    //////PlacesVisited
    User.belongsToMany(Place,{through: PlacesVisited});
    Place.belongsToMany(User,{through: PlacesVisited});
    User.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(User);
    Place.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(Place);

    // Many to Many to Many
    //// Place - User - Review
    User.hasMany(PlaceReviews);
    Review.hasMany(PlaceReviews);
    Place.hasMany(PlaceReviews);
    PlaceReviews.belongsTo(User);
    PlaceReviews.belongsTo(Review);
    PlaceReviews.belongsTo(Place);
}