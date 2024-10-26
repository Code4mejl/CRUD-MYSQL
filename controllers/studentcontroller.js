// GET ALL STUDENTS LIST

const db = require("../config/db");

const getStudents = async  (req,res) =>{
    try{

        const data =  await db.query(' SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message:'All Students Records',
            totalStudents: data[0].length,
            data: data[0],
        });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in Get All Student API",
            error
        })
    }
};
  //  GET STUDENT BY ID

  const getStudentByID = async (req, res) => {
    try{
   const studentId = req.params.id;
    
    if(!studentId) {
    return res.status(404).send({
        success:false,
        message: 'Invalid id or provide student id'
    })
   }
   //const data = await db.query('SELECT * FROM students WHERE id = studendId')
   const data = await db.query('SELECT * FROM students WHERE ID=?',[
    studentId,
]);
      if(!data){
        return res.status(404).send({
            success: false,
            message: 'no record found'
        })
      }

     res.status(200).send({
        success: true,
        studentDetails: data[0], 
     })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get student by id API ',
            error
        })
    }
  }

  
// CREATE STUDENT
const createStudent = async  (req,res) => {
    try{
     const {name,roll_no,fees, medium} = req.body
     if(!name || !roll_no ||!fees  ||!medium){
        return res.status(500).send({
            success: false,
            message: 'Please Provide all fields'
        })
     }

     const data = await db.query('INSERT INTO students (name, roll_no, fees, medium)    VALUES (?, ?, ?, ?)', [name,roll_no,fees,medium] )
     if(!data) {
        return res.status(404).send({
            success:false,
            message: 'Error in INSERT QUERY'
        })
     }

     res.status(201).send({
        success: true,
        message: 'New Student Record Created',

     })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Case Student API',
            error
        })
    }

};

//UPDATE STUDENT
const updateStudent = async  (req,res) =>{
    try{
      const studentId = req.params.id;
      if(!studentId){
        return res.status(404).send({
            success:false,
            message:'Invalid ID or provide id'
        })
      }
     const {name,roll_no,fees,medium} =req.body;
     const data = await db.query('UPDATE students SET name=?, roll_no=?,fees =?, medium=?  WHERE id=?',[name,roll_no,fees,medium,studentId]);
    if(!data){
        return res.status(500).send({
            success:false,
            message: 'Error in Update Data'
        })
    }
    res.status(200).send({
        success: true,
        message: 'Student Details UPDATED',
    });
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Erorr in update Student API',
            error
        })
    }

   }
   
   // DELETE STUDENT 
   const deleteStudent = async  (res,req) => {
    try{
   const studentId = req.params.id;
   if(!studentId ){
    return res.status(404).send({
        success: false,
        message: 'Please provide Student Id or valid student Id'
    })
   }
    await db.query ('DELETE FROM students WHERE id =?',[studentId])
res.status(200).send({
    success: true,
    message:'Student Deleted Successfully'
})


    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error In Delete Student API',
            error
        })
    }
   }




   module.exports = {getStudents,getStudentByID,createStudent,updateStudent,deleteStudent };
