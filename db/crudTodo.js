  
const insertTask = (db,{titre, description, categorie, date, priorite, heureDebut, heureFin}) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tasks (titre, description, categorie, date, priorite, heureDebut, heureFin, done) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [titre, description, categorie, date, priorite, heureDebut, heureFin, 0], 
        (_, results) => {
          console.log('Tâche insérée avec succès!');
        },
        (_, error) => {
          console.error('Erreur lors de l\'insertion de la tâche :', error);
        }
      );
    });
  };

  const retrieveTasks = (db) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM tasks',
          [],
          (_, results) => {
            const tasks = results.rows._array;
            // console.log('Tâches récupérées avec succès!', tasks);
            resolve(tasks);
          },
          (_, error) => {
            console.error('Erreur lors de la récupération des tâches :', error);
            reject(error);
          }
        );
      });
    });
  };
  

const updateTask = (db,id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE tasks SET done = 1 WHERE id = ?',
      [id],
      (_, results) => {
        console.log('Tâche mise à jour avec succès!');
      },
      (_, error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
      }
    );
  });
}

export { insertTask, retrieveTasks, updateTask};
