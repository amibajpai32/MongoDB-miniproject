const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connction successful");
  })
   .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats =[
    {
        from: "neha",
        to:"preeti",
        msg: "send me notes for exams",
        
    },
    {
        from: "Sonia",
        to:"priya",
        msg: "send me notes for exams",
        
    },
    {
        from: "neha",
        to:"preeti",
        msg: "send me clothes",
       
    },
    {
        from: "Aman",
        to:"golu",
        msg: "Let's party",
        
    },

]

Chat.insertMany(allChats);