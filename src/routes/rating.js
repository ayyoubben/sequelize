const { Sequelize, Op } = require("sequelize");
const Book = require("../models/book");
const Rating = require('../models/rating')

const sequelize = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  })
  
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
  }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
  });

Book.hasOne(Rating);
Rating.belongsTo(Book);

/*const ratings = [
        {
          "rating": "4",
          "bookId": "10"
        },
        {
          "rating": "2",
          "bookId": "6"
        },
        {
          "rating": "1",
          "bookId": "4"
        },
        {
          "rating": "5",
          "bookId": "5"
        },
        {
          "rating": "3",
          "bookId": "1"
        },
        {
          "rating": "1",
          "bookId": "2"
        },
        {
          "rating": "4",
          "bookId": "3"
        }
]

sequelize.sync().then(() => {
    console.log('Rating table created successfully!');
    Rating.bulkCreate(ratings).then(()=> {
        console.log('Ratings created successfully');
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
 
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
*/
const oreders = [
    ['createdAt', 'DESC'],
    [Book, 'author', 'ASC']
]
const filters1 = [
  ['id', 'gt', 3]
]
const filters2 = {}
filters1.forEach(f => {
  switch(f[1]) {
    case 'gt':
      filters2[f[0]] = {[Op.gt]: f[2]}
      break;
    case 'eq':
      filters2[f[0]] = {[Op.eq]: f[2]}
      break;
    case 'ne':
      filters2[f[0]] = {[Op.ne]: f[2]}
      break;
    case 'is':
      filters2[f[0]] = {[Op.is]: f[2]}
      break;
    case 'not':
      filters2[f[0]] = {[Op.not]: f[2]}
      break;  
    case 'gte':
      filters2[f[0]] = {[Op.gte]: f[2]}
      break;  
    case 'lt':
      filters2[f[0]] = {[Op.lt]: f[2]}
      break;
    case 'lte':
      filters2[f[0]] = {[Op.lte]: f[2]}
      break;  
    case 'between':
      filters2[f[0]] = {[Op.between]: f[2]}
      break;
    case 'notBetween':
      filters2[f[0]] = {[Op.notBetween]: f[2]}
      break;  
    case 'all':
      filters2[f[0]] = {[Op.all]: f[2]}
      break;  
    case 'in':
      filters2[f[0]] = {[Op.in]: f[2]}
      break;
    case 'notIn':
      filters2[f[0]] = {[Op.notIn]: f[2]}
      break;  
    case 'like':
      filters2[f[0]] = {[Op.like]: f[2]}
      break;  
    //
    case 'notLike':
      filters2[f[0]] = {[Op.notLike]: f[2]}
      break;
    case 'startsWith':
      filters2[f[0]] = {[Op.startsWith]: f[2]}
      break;
    case 'endsWith':
      filters2[f[0]] = {[Op.endsWith]: f[2]}
      break;  
    case 'substring':
      filters2[f[0]] = {[Op.substring]: f[2]}
      break;  
    case 'iLike':
      filters2[f[0]] = {[Op.iLike]: f[2]}
      break;
    case 'notILike':
      filters2[f[0]] = {[Op.notILike]: f[2]}
      break;  
    case 'regexp':
      filters2[f[0]] = {[Op.regexp]: f[2]}
      break;
    case 'notRegexp':
      filters2[f[0]] = {[Op.notRegexp]: f[2]}
      break;  
    case 'iRegexp':
      filters2[f[0]] = {[Op.iRegexp]: f[2]}
      break;
    case 'notIRegexp':
      filters2[f[0]] = {[Op.notIRegexp]: f[2]}
      break;
    case 'any':
      filters2[f[0]] = {[Op.any]: f[2]}
      break;  
    case 'match':
      filters2[f[0]] = {[Op.match]: f[2]}
      break;
  }
})
console.log(filters2); 
/*const filters = {
    id: {
        [Op.between]: [1, 10]
    },
    '$book.author$': {
        [Op.like]: '%morgan%'
    }
}
*/

sequelize.sync().then(() => {
    Rating.findAll({
        include: {model: Book, required: false},
        //limit = size
        //offset = page * size ---->from page 0
        /*limit: 2,
        offset: 3*2,
        order: oreders,*/
        where: filters2
    }).then(res => {
        /*const res1 = []
        res.forEach(r => res1.push(r['dataValues']))
        //const res2 = res1['dataValues']*/
        //console.log(res)
        console.log(JSON.stringify(res, null, 2));
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});