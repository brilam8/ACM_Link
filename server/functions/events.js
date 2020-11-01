const express = require('express');
const router = express.Router()
const { json } = require('express');
const {db, admin} = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const eventsCollection = db.collection('events')
//getEvents
router.get('/', async (req, res) => {
  const query = await eventsCollection.get()
  let result = []
  query.forEach(doc => {
    result.push(doc.data())
  })
  res.json(result)
})
//getEvent by id
router.get('/:event_id', async (req, res) => {
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get()
  if(query.empty){
    res.status(400).send('No such event was found')
  }
  let result = []
  query.forEach(doc => {
    result.push(doc.data())
  })
  res.json(result)
})
//getOwnerEvents by id
router.get('/getOwnerEvents/:creator_id', async (req, res) => {
  const query = await eventsCollection.where('creator_id', '==', req.params.creator_id).get()
  if(query.empty){
    res.status(400).send('No such creator found')
  }
  let result = []
  query.forEach(doc => {
    result.push(doc.data())
  })
  res.json(result)
})
//how to differentiate between getuserevent and getevent?
router.get('/OwnerEvent/:creator_id/:event_id', async (req, res) => {
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get()
  let result = []
  query.forEach(doc => {
    result.push(doc.data())
  })
  res.json(result)
})
//setOwnerEvent status with a boolean value
router.post('/setOwnerEvent/:event_id/:status', async (req, res) => {
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get()
  if(query.empty) {
    res.status(400).send('No such event was found')
  }
  const event = query.docs[0]
  event.ref.update({status:req.params.status})
  res.send(`Event ${req.params.event_id}'s status updated to ${req.params.status}`)
})
//creates a new Event
router.post('/createEvent', async (req, res) => {
  if(!req.body || !req.body.applications || !req.body.creator_id || !req.body.description || !req.body.end_date || !req.body.event_id || 
    !req.body.max_applicants || !req.body.start_date || !req.body.status || !req.body.title || !req.body.type){

    //console.log(!req.body, !req.body.applications, !req.body.creator_id, !req.body.description , !req.body.end_date , !req.body.event_id , 
    //!req.body.max_applicants , !req.body.start_date , !req.body.status , !req.body.title , !req.body.type)

    res.send("Missing fields on request")
  }else{
    const event = {
      applications: req.body.applications,
      creator_id: req.body.creator_id,
      description: req.body.description,
      end_date: req.body.end_date,
      event_id: req.body.event_id,
      max_applicants: req.body.max_applicants,
      start_date: req.body.start_date,
      status: req.body.status,
      title: req.body.title,
      type: req.body.type     
    }

    eventsCollection.doc().set(event)
    .then(() => res.json(event))
  }
})

module.exports = router