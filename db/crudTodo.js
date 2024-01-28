const insertTask = (db, { titre, description, categorie, date, priorite, heureDebut, heureFin }) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO tasks (titre, description, categorie, date, priorite, heureDebut, heureFin, done) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [titre, description, categorie, date, priorite, heureDebut, heureFin, 0],
          (_, results) => {
            console.log('Tâche insérée avec succès!');
            resolve(results);
          },
          (_, error) => {
            console.error("Erreur lors de l'insertion de la tâche :", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error("Erreur lors de la transaction :", error);
        reject(error);
      },
      () => {
        // La transaction est terminée
      }
    );
  });
};

  const retrieveTasks = (db) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM tasks ORDER BY date DESC',
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
  
  const deleteTask = (db, id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM tasks WHERE id = ?',
          [id],
          (_, results) => {
            console.log('Tâche supprimée avec succès!');
            // Only return the id if deletion is successful
            resolve(id);
          },
          (_, error) => {
            console.error('Erreur lors de la suppression de la tâche :', error);
            reject(error);
          }
        );
      });
    });
  };
  
const updateTask = (db, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tasks SET done = 1 WHERE id = ?',
        [id],
        (_, results) => {
          console.log('Tâche terminée avec succès!');
          // Only return the id if deletion is successful
          resolve(id);
        },
        (_, error) => {
          console.error('Erreur lors de la suppression de la tâche :', error);
          reject(error);
        }
      );
    });
  });
};

export { insertTask,updateTask ,retrieveTasks,deleteTask};
