const { Sequelize, DataTypes, Op } = require("sequelize");
const Book = require('./book.model')

const sequelize = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  })
  
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
  }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
  });


/*const books = [
{
  "title": "Entroflex",
  "author": "Lara Cherry",
  "release_date": "1994-01-11",
  "subject": "41"
},
{
  "title": "Opticom",
  "author": "Griffin Hebert",
  "release_date": "1991-10-09",
  "subject": "63"
},
{
  "title": "Tetak",
  "author": "Meyers Mcdaniel",
  "release_date": "1990-10-06",
  "subject": "49"
},
{
  "title": "Geeky",
  "author": "Dorothy Morgan",
  "release_date": "1989-10-02",
  "subject": "72"
},
{
  "title": "Housedown",
  "author": "Mamie Golden",
  "release_date": "1988-02-19",
  "subject": "43"
},
{
  "title": "Indexia",
  "author": "Carlene Charles",
  "release_date": "1993-07-03",
  "subject": "52"
},
{
  "title": "Cogentry",
  "author": "Duffy Mcgowan",
  "release_date": "1992-06-27",
  "subject": "38"
},
{
  "title": "Digifad",
  "author": "Morgan Preston",
  "release_date": "1988-09-25",
  "subject": "77"
},
{
  "title": "Netbook",
  "author": "Wendi Estrada",
  "release_date": "1991-06-13",
  "subject": "60"
},
{
  "title": "Puria",
  "author": "Carol Thomas",
  "release_date": "1992-01-14",
  "subject": "68"
}
]  
sequelize.sync().then(() => {
    console.log('Book table created successfully!');
    Book.bulkCreate(books).then(()=> {
        console.log('Books created successfully');
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
 
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
sequelize.sync().then(() => {
   console.log('Book table created successfully!');

   Book.create({
       title: "Clean Code",
       author: "Robert Cecil Martin",
       release_date: "2021-12-14",
       subject: 3
   }).then(res => {
       console.log(res)
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });

}).catch((error) => {
   console.error('Unable to create table : ', error);
});

sequelize.sync().then(() => {

    Book.findAll().then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});
*/
const oreders = [
    ['createdAt', 'DESC'],
    ['author', 'ASC']
]

const filters = {
    id: {
        [Op.between]: [6, 10]
    },
    author: {
        [Op.like]: '%morgan%'
    }
}
sequelize.sync().then(() => {

    Book.findAll({
        //limit = size
        //offset = page * size ---->from page 0
        /*limit: 2,
        offset: 3*2,
        order: oreders,*/
        where: filters
    }).then(res => {
        const res1 = []
        res.forEach(r => res1.push(r['dataValues']))
        //const res2 = res1['dataValues']
        console.log(res1)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});

/*sequelize.sync().then(() => {

    Book.destroy({
        where: {
          id: 2
        }
    }).then(() => {
        console.log("Successfully deleted record.")
    }).catch((error) => {
        console.error('Failed to delete record : ', error);
    });
  
  }).catch((error) => {
      console.error('Unable to create table : ', error);
  });*/