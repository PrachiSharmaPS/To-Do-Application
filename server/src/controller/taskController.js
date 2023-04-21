
const Task=require("../model/toDoModel")
const User=require("../model/userModel")


//const nameregex = RegExp("[a-zA-Z0-9\s]");

const createTask=async function(req,res){
try{
    const data=req.body;

    if(Object.keys(data).length == 0){return res.status(400).send({status:false, message:"Please provide Data in request"})}

    const {userId,taskName}=data
    
//------------checking all the mandatory fields-------

    if(!userId || !taskName ){
        return res.status(400).send({status:false, message:"Please provide all necessary task Details"})     }
        const user = await User.findOne({
            where: {
              id: userId
            }
          });
          if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
          }      
          const [numAffectedRows, affectedRows] = await User.update(
            {
              taskCount: sequelize.literal('taskCount + 1'),
              pending: sequelize.literal('pending + 1')
            },
            {
              where: {
                id: userId,
                isDeleted: false
              },
              returning: true
            }
          );
          if (numAffectedRows === 0) {
            return res.status(404).send({ status: false, message: "User is deleted or does not exist" });
          }
          const taskDetail = await Task.create(data);
          return res.status(201).send({ status: true, message: "Success", data: taskDetail });
          

}catch(err){
    return res.status(500).send({status:false, message:err.message})
}
}
//-------------get all task of given user-------------
const getTask = async function (req,res){
    try {
    const data = req.query//--------------------------------
    const tasks = await Task.findAll({
        where: {
          ...data,
          isDeleted: false
        }
      });
      if (tasks.length === 0) {
        return res.status(404).send({ status: false, message: "No such task found" });
      } 
      return res.status(200).send({ status: true, message: "Success", data: tasks });
    } catch (error) { 
      return res.status(500).send({status:false,msg:error.message})
        
    }
}
//------------------------get by id 
const getTaskById = async function (req,res){

    try {

    const taskId = req.params.taskId
    const task = await Task.findOne({
        where: {
          id: taskId,
          isDeleted: false
        }
      });
      
      if (!task) {
        return res.status(404).send({ status: false, msg: "No such task found" });
      }

    return res.status(200).send({status:true,msg:"Success",data:task})

    } catch (error) {
        
      return res.status(500).send({status:false,msg:error.message})
        
    }
}
//===================================update Task===========================================================//
const updateTask =async function (req,res){
    try{
       const taskId=req.params.taskId  
       const data=req.body
    
       if(Object.keys(data).length == 0) {return res.status(400).send({status:false, message:"Please provide some data"})}
       const [numAffectedRows, affectedRows] = await Task.update(
        data,
        {
          where: {
            id: taskId,
            isDeleted: false
          },
          returning: true
        }
      );
      if (numAffectedRows === 0) {
        return res.status(404).send({ status: false, message: "Task not found" });
      } 
      const task = affectedRows[0];
      return res.status(200).send({ status: true, message: "Success", data: task });
      
    }
    catch(err){
       return res.status(500).send({status:false,msg:err.message})
   }}
 //....................DeleteTask.....................................................
const deleteTask= async function(req,res){
    try {
        let taskId= req.params.taskId
        const task = await Task.findByPk(taskId);
        if (!task) {
          return res.status(404).send({ status: false, message: "Task not found" });
        }
        if (task.isDeleted === true) {
          return res.status(400).send({ status: false, message: "Task is already deleted" });
        }
        task.isDeleted = true;
        task.deletedAt = new Date();
        await task.save();
        return res.status(200).send({ status: true, message: "Task is successfully deleted" });
          }   
    catch (err) {
        return res.status(500).send({ status: false, message: err.message, })
  }}


  
module.exports={createTask,getTask,getTaskById,updateTask,deleteTask}



