const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
var cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt")
const User = require("./user")
const crypto = require('crypto')
const path = require("path")
mongoose.connect("mongodb+srv://Admin-NM:Fireball8!@cluster0.tt1le.mongodb.net/userRDB",{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.use(express.json({limit:'1mb'}))

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "Thisismysecretkey",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("Thisismysecretkey"))
app.use(passport.initialize())
app.use(passport.session())
require("./auth")(passport)


app.post("/registerUser",function(req,res,next){
  const {username,password,email} = req.body

  User.findOne({username:username}, async (err,doc)=>{
    if (err) throw err;
    if (doc) res.send('Exists');
    if (!doc) {
      const hashed = await bcrypt.hash(password,10)
      const newUser = new User({
        username:username,
        password:hashed,
        email:email,
        validation:"Confirmed",
        TokenReset:""
      })

      await newUser.save()

      passport.authenticate("local",(err,user,info)=>{
        if (err) throw err;
         else {
           req.login(user, (err) => {
             res.send("Sucess")
           })
         }
      })(req,res,next)
    }
  })
})

app.get("/activated",function(req,res){
  const username = req.user.username

  User.findOne({username:username},function(err,result){
    if (err){
      res.json(err)
    } else {
      if (result["validation"] === "Confirmed"){
      res.send("Confirmed")
      }
    }
  })
})

app.get("/validation",function(req,res){
  const username = req.user.username

  User.findOne({username:username},function(err,result){
    if (err){
      console.log(err)
    } else if (result !== null){
      res.send(result["username"])
      }
    })
})

app.post("/login",function(req,res,next){
  passport.authenticate("local",(err,user,info)=>{
    if (err) throw err;
    if (!user) res.send("User does not exist");
     else {
       req.login(user, (err) => {
         res.send("Sucess")
       })
     }
  })(req,res,next)
})

app.post("/generateToken",function(req,res){
  const {username, email, token} = req.body

  User.findOneAndUpdate({email:email, username:username}, {$set: {TokenReset: token}}, function(err,result){
    if (err){
      console.log(err)
    } else if (result === null) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

app.post("/findAccount",function(req,res){
  const {username, token} = req.body


  User.findOneAndUpdate({username:username, TokenReset:token}, {$set: {TokenReset: ""}}, function(err,result){
    if (err){
      console.log(err)
    } else if (result === null) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

app.post("/resetPassword",function(req,res){
  const {username, password} = req.body

  const hash = bcrypt.hashSync(password, 10);

  bcrypt.compare(password, hash, function(err, results){
    if(err){
      throw new Error(err)
    } if (results) {
      User.findOneAndUpdate({username:username}, {$set: {password: hash}}, function(err,result){
        if (err){
          console.log(err)
        } else if (result === null) {
          res.send(false)
        } else {
          res.send(true)
        }
      })
    } else {
      res.send(false)
    }
  })
})

/* ---------------- Food Information ----------------------- */

app.post("/foodInput",function(req,res){
  const {foodItem} = req.body
  const user = req.user.username
  var id = crypto.randomBytes(10).toString("hex")

  const {Food,Cals,Fat,Carbs,Servings,Date} = foodItem
   const info = {
    id: id,
    Food:Food,
    cals:Cals,
    fat:Fat,
    carbs:Carbs,
    servings:Servings,
    date:Date
  }

  User.findOneAndUpdate({username:user}, {$push: {foodInfo: info}}, function(err,result){
    if (err){
      res.json(err)
    } else {
      res.send("Sucess")
    }
  })
})

app.get("/foodslist/:date",function(req,res){
  const {date} = req.params

  const user = req.user.username


  User.findOne({username:user},function(err,result){
    if (err){
      console.log(err)
    } else {
      const foodsList = result["foodInfo"].filter(item => item["date"] === date)
      if (foodsList.length === 0){
      res.send(false)
    } else {
      res.send(foodsList)
      }
    }
  })
})

app.get("/getFoodinfo/:id",function(req,res){
  const {id} = req.params
  const user = req.user.username

  User.findOne({username:user},function(err,result){
    if (err){
      console.log(err)
    } else {
      const foodItem = result["foodInfo"].find(item => item["id"] === id)
      res.send(foodItem)
    }
  })
})

app.get("/food-modify/:id",function(req,res){
  const {id} = req.params
  const user = req.user.username

  User.findOne({username:user},function(err,result){
    if (err){
      console.log(err)
    } else {
      const foodItem = result["foodInfo"].find(item => item["id"] === id)
      if (foodItem === undefined){
        res.send(false)
      } else {
      res.send(foodItem)
      }
    }
  })
})

app.post("/food-modify/:id",function(req,res){
  const {foodList} = req.body
  const {id,Food,cals,fat,carbs,servings,date} = foodList
  const user = req.user.username

  const info = {
   id: id,
   Food:Food,
   cals:cals,
   fat:fat,
   carbs:carbs,
   servings:servings,
   date:date
 }


  User.findOneAndUpdate({username:user},{$pull: {'foodInfo':{'id': id}}},
    function(err,result){
    if (err){
      res.json(err)
      }
    }
  )
  User.findOneAndUpdate({username:user},{$push: {foodInfo: info}},
    function(err,result){
    if (err){
      res.json(err)
    } else {
      res.json("Sucess")
    }
    }
  )
})

app.post("/deleteFood",function(req,res){
  const {id} = req.body
  const user = req.user.username

  User.findOneAndUpdate({username:user},{$pull: {'foodInfo':{'id': id}}},
    function(err,result){
    if (err){
      res.json(err)
    } else {
      res.send(true)
    }}
  )
})

/* ---------------- Food Information ----------------------- */

/* ---------------- Activity Information ----------------------- */


app.post("/existingActivity",function(req,res){
  const user = req.user.username
  const {activity:{calories,date}} = req.body

  User.findOne({username:user},function(err,result){
    if (err) {
      console.log(err)
    } else {
        const validDate = result["Activity"].some(x => x['date'] === date)
        res.send(validDate)
      }
    }
  )
})

app.post("/activity",function(req,res){
  const {activity:{calories,date}} = req.body

  const user = req.user.username

  var id = crypto.randomBytes(10).toString("hex")

  const info = {
    id:id,
    calories: calories,
    date: date
  }

  User.findOneAndUpdate({username:user},{$push: {Activity:info}}, function(err,result){
    if (err){
      console.log(err)
    } else {
      res.send("Sucess")
    }
  })
})

app.get("/getActivity/:date",function(req,res){
  const {date} = req.params

  const user = req.user.username

  User.findOne({username:user},function(err,result){
    if (err){
      console.log(err)
    } else {
      const activity = result["Activity"].filter(item => item["date"] === date)
      if (activity.length !== 0) {
      res.send(activity[0])
    } else {
      res.send(false)
    }
    }
  })
})

app.get("/activity-modify/:id",function(req,res){
  const {id} = req.params
  const user = req.user.username

  User.findOne({username:user},function(err,result){
    if (err){
      console.log(err)
    } else {
      const activityData = result["Activity"].find(item => item["id"] === id)
      if (activityData === undefined){
        res.send(false)
      } else {
      res.send(activityData)
    }
    }
  })
})

app.post("/activity-modify/:id",function(req,res){
  const {activity} = req.body
  const {id,calories,date} = activity
  const user = req.user.username

  const info = {
    id:id,
    calories: calories,
    date: date
 }

  User.findOneAndUpdate({username:user},{$pull: {'Activity':{'id': id}}},
    function(err,result){
    if (err){
      console.log(err)
      }
    }
  )
  User.findOneAndUpdate({username:user},{$push: {Activity: info}},
    function(err,result){
    if (err){
      res.json(err)
    } else {
      res.json("Sucess")
    }
  })
})

/* ---------------- Activity Information ----------------------- */
app.get("/user",function(req,res){
  if (req.user === undefined){
    res.send(false)
  } else {
    res.send(req.user.username)
  }
})

app.get("/logout",function(req,res){
  req.logout()
  res.send('Logged Out');
})

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
});
}

let port = process.env.PORT

if (port === undefined || port === ""){
  port = 5000
}


app.listen(port,function(){
  console.log("Server is running")
})
