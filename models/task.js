var mongoose = require('mongoose'), Schema = mongoose.Schema;

var taskSchema = new Schema({
	autor: { type: Schema.ObjectId, ref: "Autor" },
	nombre: { type: String },
	prioridad: { type: Number },
	fecha: { type: Date }
});


module.exports = mongoose.model('tasks', taskSchema);