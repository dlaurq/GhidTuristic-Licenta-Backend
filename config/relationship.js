module.exports = () => {
    const {Country, County, Image, Location, Place, PlacesToVisit, PlacesVisited, Review, User, Role, City, Category} = require('./ModelsConfig')
    //One to One Relations
    User.hasOne(Image);
    Image.belongsTo(User);
    Location.hasMany(User)
    User.belongsTo(Location)

    ////One to Many relations
    //Country
    Country.hasMany(County);
    County.belongsTo(Country);

    //County
    County.hasMany(City);
    City.belongsTo(County);

    //City
    City.hasMany(Location);
    Location.belongsTo(City);

    //Location
    Location.hasMany(Place);
    Place.belongsTo(Location);

    //Place
    Place.hasMany(Image);
    Image.belongsTo(Place);

    //Review
    Review.hasMany(Image);
    Image.belongsTo(Review);

    //User
    User.hasMany(Role)
    Role.belongsTo(User)
    User.hasMany(Place)
    Place.belongsTo(User)
    Location.hasMany(User);
    User.belongsTo(Location);

    //Category
    Category.hasMany(Place)
    Place.belongsTo(Category)

    //Super Many to Many relations
    ////User and Place
    //////PlacesToVisit
    User.belongsToMany(Place,{through: PlacesToVisit, unique: false});
    Place.belongsToMany(User,{through: PlacesToVisit, unique: false});
    User.hasMany(PlacesToVisit);
    PlacesToVisit.belongsTo(User);
    Place.hasMany(PlacesToVisit);
    PlacesToVisit.belongsTo(Place);
    //////PlacesVisited
    User.belongsToMany(Place,{through: PlacesVisited, unique: false});
    Place.belongsToMany(User,{through: PlacesVisited, unique: false});
    User.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(User);
    Place.hasMany(PlacesVisited);
    PlacesVisited.belongsTo(Place);
    //////Review
    User.belongsToMany(Place,{through: Review, unique: false});
    Place.belongsToMany(User,{through: Review, unique: false});
    User.hasMany(Review);
    Review.belongsTo(User);
    Place.hasMany(Review);
    Review.belongsTo(Place);
}