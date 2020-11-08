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

router.get('/api/homework', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "0101",
    creater_id: "1010",
    title: "Homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1111",
    creater_id: "2222",
    title: "Looking for gaming team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "3333",
    creater_id: "3232",
    title: "Side project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const homework = await eventCollection.where('type', '==', 'HOMEWORK');
  const query = await homework.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/videogames', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "1234",
    creater_id: "4321",
    title: "Finding homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const videoGame = await eventCollection.where('type', '==', 'VIDEOGAMES');
  const query = await videoGame.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/projects', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "4500",
    creater_id: "0123",
    title: "Hw group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const project = await eventCollection.where('type', '==', 'PROJECTS');
  const query = await project.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/misc', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "1234",
    creater_id: "4321",
    title: "Finding homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);

  const misc = await eventCollection.where('type', '==', 'OTHER');
  const query = await misc.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});


module.exports = router