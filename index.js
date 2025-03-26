const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
   .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});
//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});
//Create Route
app.post("/chats", async (req, res) =>{
  try{
    let { from, to, msg } = req.body;
    if(!from || !to || !msg){
      return res.status(400).send("All fields are required");
    }
    let newChat = new Chat({//new chat created
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    await newChat //saving new chat
      .save();//this save process is an asyncronous process
      
        console.log("chat was saved");
        res.redirect("/chats");}
      
      catch(err)  {
        console.log(err);
      };
  


});
//Edit route
app.get("/chats/:id/edit",async (req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//UPDATE Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg} = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id, 
    {msg: newMsg}, 
    {runValidators: true, new: true}
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//DELETE Route
app.delete("/chats/:id", async (req, res) => {
  try{
   let {id} = req.params;
   let deleteChat = await Chat.findByIdAndDelete(id);

   if(!deleteChat){
    console.log("No chat found with ID:", id);
    return res.status(404).send("Chat not found");
   }
   console.log(deleteChat);
   res.redirect("/chats");
}
  catch(err){
    console.log("Delete error:", err);
    res.status(500).send("Error deleting chat")
  }
});
app.get("/", (req, res) =>{
    res.send("root is working");
});

app.listen(8080, () =>{
    console.log("Server is listening on port 8080");
});
