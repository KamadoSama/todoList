import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('nom_de_la_base_de_donnees.db');

db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, description TEXT, categorie TEXT, date TEXT, priorite TEXT, heureDebut TEXT, heureFin TEXT, done INTEGER)'
    );
  });
  
  const insertTask = ({titre, description, categorie, date, priorite, heureDebut, heureFin}) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tasks (titre, description, categorie, date, priorite, heureDebut, heureFin, done) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [titre, description, categorie, date, priorite, heureDebut, heureFin, 0], // 0 pour indiquer que la tâche n'est pas encore faite
        (_, results) => {
          console.log('Tâche insérée avec succès!');
        },
        (_, error) => {
          console.error('Erreur lors de l\'insertion de la tâche :', error);
        }
      );
    });
  };

const retrieveTasks = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM tasks',
      [],
      (_, results) => {
        const tasks = results.rows._array;
        console.log('Liste des tâches :', tasks);
      },
      (_, error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  });
};

export { insertTask, retrieveTasks };
