const express = require('express');
const mongoDB = require('mongodb');

const router = express.Router();

router.get('/posts', async (req, res, next)=>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/posts', async (req, res, next) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

router.delete('/posts/:id', async (req, res, next) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id:  new mongoDB.ObjectID(req.params.id)})

    res.status(200).send();
})


async function loadPostCollection(){
    const client = await mongoDB.MongoClient.connect
    ('mongodb://vinay-dagar:vinay1234@ds149744.mlab.com:49744/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;