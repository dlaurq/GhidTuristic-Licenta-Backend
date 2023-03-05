module.exports = () => {
    const {Country, County, Image, Location, Place, UsersPlacesReviews, PlacesToVisit, PlacesVisited, Review, User, Role, City} = require('./ModelsConfig')
    console.log('aaa')
    //One to One Relations
    User.hasOne(Image);
    Image.belongsTo(User);

    //One to Many relations
    ////Country
    Country.hasMany(County);
    County.belongsTo(Country);
    ////County
    County.hasMany(City);
    City.belongsTo(County);
    ////City
    City.hasMany(Location);
    Location.belongsTo(City);
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
    //User
    User.hasMany(Role)
    Role.belongsTo(User)

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
    User.hasMany(UsersPlacesReviews);
    Review.hasMany(UsersPlacesReviews);
    Place.hasMany(UsersPlacesReviews);
    UsersPlacesReviews.belongsTo(User);
    UsersPlacesReviews.belongsTo(Review);
    UsersPlacesReviews.belongsTo(Place);
}