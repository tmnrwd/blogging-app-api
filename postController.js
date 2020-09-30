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

exports.create = function (req, res, next) {   //create operation
    if(!req.body.title) {
        return(next(createError(400, "title is required")))
        //if there's no body, run createError and present a 400 error with this string
    }
    const post = new Post({ title: req.body.title, tags: req.body.tags, text: req.body.text, date: req.body.date})
    post.save()
    .then(() => res.send({ result: true })
    )
}

exports.show = function (req, res, next) {
    Post.findOne({ _id: ObjectId(req.params.id)})
    .then((post) => {
        if(!post) {
            return(next(createError(404, "no post with that id")))          //display error if no such todo exists
        }
        res.send(post)                                                  //send the assigned todo
    })
};

exports.update = function (req, res, next) {
    Post.findOne({ _id: ObjectId(req.params.id)})
    .then((post) => {
        if(!post) {
            return(next(createError(404, "no post with that id")))          //display error if no such todo exists
        }
        if (req.body.title){post.title = req.body.title};
        if (req.body.tags){post.tags = req.body.tags};
        if (req.body.text){post.text = req.body.text};
        if (req.body.date){post.date = req.body.date};
        post.save().then(() => res.send({ result: true }))
    })
};


/*
//here is a different variety of update function:
exports.update = async function (req, res, next) {

    if (!req.body.title) {
        return (next(createError(400, "title is required")))
    }

    try {
        const r = await (await listPromise).updateOne({ _id: ObjectId(req.params.id) },{ $set: { title: req.body.title, tags: req.body.tags, text: req.body.tags, date: req.body.date }})

        if (r.matchedCount) {
            return res.send({ result: true})
        }
        return (next(createError(404, "no post with that id")))    
    } catch (e) {
        next(e)
    }
}
*/

exports.delete = function (req, res, next) {
    Post.deleteOne({ _id: ObjectId(req.params.id) })
    .then((r) => {
        if (r.deletedCount) {
            return res.send({ result: true })
        }
        return (next(createError(404, "no post with that id")))
    })    
}