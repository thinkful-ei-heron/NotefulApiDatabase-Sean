const NotesService = {
    getAllNotes(knex){
        return knex.select('*').from('notes')
    },
    getByNoteId(knex, noteId){
        return knex
            .from('notes')
            .select('*')
            .where('id', noteId)
            .first()
    },
    insertNote(knex, newNote){
        return knex
            .insert(newNote)
            .into('notes')
            .returning('*')
            .then(row => {
                return row[0]
            })
    },
    deleteNote(knex, id){
        return knex('notes')
            .where({id})
            .delete()
    },
    updateNote(knex, id, updatedFields){
        return knex('notes')
            .where({id})
            .update(updatedFields)
    }

}

module.exports = NotesService