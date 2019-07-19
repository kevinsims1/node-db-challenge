const db = require('../data/dbConfig.js')

module.exports = {
    getProjects,
    findById,
    addProject,
    addAction,
    findActions
  };

  function getProjects() {
    return db('projects')
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first()
        .then(user => {
            if(user){
                return user
            } else {
              return null;
            }
        })
}

function addProject(project) {
    return db('projects')
     .insert(project)  
  }

  function addAction(actionData, project_id){
    return db('actions')
        .insert({...actionData, project_id})   
}

function findActions(id) {
    return db('project_actions')
    .innerJoin('actions', 'project_actions.actions_id', 'actions.id')
    .where({ project_id: id })
    .select('action_description', 'action_notes')
}