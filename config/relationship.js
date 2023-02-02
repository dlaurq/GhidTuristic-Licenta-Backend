const { belongsTo } = require("../models/PlacesToVisit");

function relationshipGen(db){
    const {Country, County, Day, DaySchedule, HaveReviewed, Hour, Image, Location, Place, PlaceReviews, PlacesToVisit, PlacesVisited, Review, User, UserReviews} = db.models;

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
    //////VisitedPlaces
    User.belongsToMany(Place,{through: PlacesVisited});
    Place.belongsToMany(User,{through: PlacesVisited});
    User.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(User);
    Place.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(Place)

    //Super Many to Many to Many relations
    ////Place - Review - User
    //////Super M:N Place - Review
    Place.belongsToMany(Review,{through: PlaceReviews});
    Review.belongsToMany(Place,{through: PlaceReviews});
    Place.hasMany(PlaceReviews);
    Review.hasMany(PlaceReviews);
    PlaceReviews.belongsTo(Place);
    PlaceReviews.belongsTo(Review);
    //////Super M:N User - PlaceReviews
    User.belongsToMany(PlaceReviews,{through: UserReviews});
    PlaceReviews.belongsToMany(User,{through: UserReviews});
    User.hasMany(UserReviews);
    PlaceReviews.hasMany(UserReviews);
    UserReviews.belongsTo(User);
    UserReviews.belongsTo(PlaceReviews);
}
module.exports = {relationshipGen};