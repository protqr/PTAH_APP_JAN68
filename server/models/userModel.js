const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID_card_number: {
        type: String,
        required: [true, "กรุณากรอกเลขบัตรประชาชน"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "กรุณากรอกรหัสผ่าน"],
       
    },
    name: {
        type: String,
    },
    surename: {
        type: String,
    },
    tel: {
        type: String,
    },
    email: {
        type: String,
    },
  
  
},
{ timestamps: true }
);

// ระบุชื่อคอลเลคชันอย่างชัดเจนให้เป็น "User"
module.exports = mongoose.model('User', userSchema, 'User');
