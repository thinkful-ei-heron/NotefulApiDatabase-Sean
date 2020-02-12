const FoldersService = {
    getAllFolders(knex){
        return knex.select('*').from('folders')
    },
    getByFolderId(knex, folderId){
        return knex
            .from('folders')
            .select('*')
            .where('id', folderId)
            .first()
    },
    insertFolder(knex, newFolder){
        return knex
            .insert(newFolder)
            .into('folders')
            .returning('*')
            .then(row => {
                return row[0]
            })
    },
    deleteFolder(knex, id){
        return knex('folders')
            .where({id})
            .delete()
    },

}

module.exports = FoldersService