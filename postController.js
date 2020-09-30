const createError = require('http-errors');
const { ObjectId } = require('mongodb');
const {Post} = require("./models/posts")

var MongoClient = require('mongodb').MongoClient;

const dbPromise = MongoClient.connect('mongodb+srv://bob:turnip@cluster0.fsbwp.mongodb.net/postlist?retryWrites=true&w=majority').then((client) => client.db('posts'))
const listPromise = dbPromise.then((db) => db.collection('list'))


exports.index = function (req, res) {
Post.find()            
    .then(posts =>
      res.send(posts))
  }

exports.create = function (req, res, next) {  
    if(!req.body.title) {
        return(next(createError(400, "title is required")))

    }
    let stringTags = req.body.tags.valueOf();
    let tagsArray = stringTags.split(",");
    let date = new Date();
    date = date.toLocaleDateString();
    const post = new Post({ title: req.body.title, tags: tagsArray, text: req.body.text, date: date})
    post.save()
    .then(() => res.send({ result: true })
    )
}

exports.show = function (req, res, next) {
    Post.findOne({ _id: ObjectId(req.params.id)})
    .then((post) => {
        if(!post) {
            return(next(createError(404, "no post with that id")))      
        }
        res.send(post)                           
    })
};

exports.update = function (req, res, next) {
    Post.findOne({ _id: ObjectId(req.params.id)})
    .then((post) => {
        if(!post) {
            return(next(createError(404, "no post with that id")))         
        }
        if (req.body.title){post.title = req.body.title};
        if (req.body.tags){post.tags = req.body.tags};
        if (req.body.text){post.text = req.body.text};
        if (req.body.date){post.date = req.body.date};
        post.save().then(() => res.send({ result: true }))
    })
};

exports.delete = function (req, res, next) {
    Post.deleteOne({ _id: ObjectId(req.params.id) })
    .then((r) => {
        if (r.deletedCount) {
            return res.send({ result: true })
        }
        return (next(createError(404, "no post with that id")))
    })    
}