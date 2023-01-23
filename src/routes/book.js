const { Sequelize, Op } = require("sequelize");
const Book = require('../models/book')
var Router = require("express");
const router = Router();
const {converter} = require("../utils/converter")

router.get("/", async (req, res) => {
  try {
    const size = Number(req.query.size) || null
    const page = Number(req.query.page) || null
    const orders = JSON.parse(req.query.sorts) || []
    const filts1 = JSON.parse(req.query.filters) || []
    const filters = converter(filts1.filters)

    const result = await Book.findAndCountAll({
        //limit = size
        //offset = page * size ---->from page 0
        limit: size,
        offset: page*size,
        order: orders.sorts,
        where: filters
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const result = await Book.findByPk(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
      try {
        const result = await Book.create({
            title: req.body.title,
            author: req.body.author,
            release_date: req.body.release_date,
            subject: req.body.subject
        }).then((response) => {
            res.send(201, "Book created");
        }).catch(e => {
            res.send(400, e);
        })
      } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    }
  );

  router.put("/:id", async (req, res) => {
      try {
        const result = await Book.update(
            { 
                title: req.body.title,
                author: req.body.author,
                release_date: req.body.release_date,
                subject: req.body.subject
            }, {
                where: {
                    id: req.params.id
                }
            }
        ).then((response) => {
            res.send(200, "Book updated");
        }).catch(e => {
            res.send(400, e);
        })
      } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    }
  );
  

router.delete("/:id", async (req, res) => {
    try {
      const result = await Book.destroy({
        where: {
          id: req.params.id
        }
      }).then((response) => {
        res.send(200, "Book deleted");
      }).catch(e => {
        res.send(400, e);
      })
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
  
module.exports = router;
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
 });*/

 /*
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
/*
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
        limit: 2,
        offset: 3*2,
        order: oreders,
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
*/
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