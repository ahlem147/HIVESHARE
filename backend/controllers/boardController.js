const Board = require('../models/board');
 




const createBoard= (id)=>{
// let data = req.body
let board = new Board();
board.project =id;
board.date= new Date();
board.save()
.then((result)=>{
console.log('created');
})
.catch((err)=>{
    console.log(err);
})
}
const deleteboard = async (id) => {
    try {
        id=board.project;
        const result = await Board.findByIdAndDelete({ _id: id });
        return result;
    } catch (err) {
        throw err;
    }
};

const byid= (req,res)=>{
  //byidproj
  let id=req.params.id;
  Board.findOne({project:id})  
  .then((result)=>{
    res.send(result)
})
.catch((err)=>{
    res.send(err)
})
}


const update = (req, res)=>{

    let data = req.body;
    let id = req.params.id;

    Board.findByIdAndUpdate({ _id: id } , data)
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
} 







module.exports={createBoard,byid,deleteboard,update}