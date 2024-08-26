import * as SQLite from 'expo-sqlite';

export async function StartDB(){
    const db = SQLite.openDatabaseSync('capital.db');
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        --DROP TABLE IF EXISTS value_objects;
        CREATE TABLE IF NOT EXISTS value_objects (
            id INTEGER PRIMARY KEY NOT NULL, 
            title VARCHAR(255) NOT NULL, 
            description TEXT NOT NULL, 
            quantity INTEGER NOT NULL, 
            value FLOAT NOT NULL
        );
    `);
}

export async function GetValueObjects(){
    const db = SQLite.openDatabaseSync('capital.db');
    const allRows = await db.getAllAsync('SELECT * FROM value_objects');
    return allRows;
}

export async function CreateValueObject(title, description, quantity, value) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (title != null && description != null && quantity != null && value != null) {
        try {
            await db.runAsync(`
                INSERT INTO value_objects (title, description, quantity, value)
                VALUES ($title, $description, $quantity, $value);
            `, {
                $title: title,
                $description: description,
                $quantity: quantity,
                $value: value
            });
            console.log('Value Object inserted successfully', title, value);
        } catch (error) {
            console.error('Error inserting Value Object:', error);
        }
    } else {
        console.error('One or more parameters are invalid:', { title, description, quantity, value });
    }
}

export async function DeleteValueObject(id){
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            await db.runAsync(`
                DELETE FROM value_objects WHERE id = $id;
            `, {$id: id});
            console.log('Value Object deleted successfully', id);
        } catch (error) {
            console.error('Error deleting Value Object:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}

export async function GetValueObjectById(id) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            console.log(id);
            const valueObject = await db.getAllAsync(`
                SELECT * FROM value_objects WHERE id = $id;
            `, { $id: id });
            return valueObject[0];
        } catch (error) {
            console.error('Error retrieving Value Object:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}

export async function UpdateValueObject(id, title, description, quantity, value) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (id && title && description && quantity && value) {
        try {
            await db.runAsync(`
                UPDATE value_objects
                SET title = $title,
                    description = $description,
                    quantity = $quantity,
                    value = $value
                WHERE id = $id;
            `, {
                $id: id,
                $title: title,
                $description: description,
                $quantity: quantity,
                $value: value
            });
            console.log('Value Object updated successfully', id);
        } catch (error) {
            console.error('Error updating Value Object:', error);
        }
    } else {
        console.error('One or more parameters are invalid:', { id, title, description, quantity, value });
    }
}
